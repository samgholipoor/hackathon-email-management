/* eslint-disable react/display-name */
import React, { useEffect } from 'react';
import {
	Children,
	ElementType,
	ReactNode,
	isValidElement,
	useCallback,
	useMemo,
	useRef,
	useState,
} from 'react';
import { motion } from 'framer-motion';
import { Icon as KheshtIcon, Button } from '@khesht/react';
import Icon from '@/components/Icon';
import { mergeClassNames } from '@/utils/classname';
import Pagination from '@/components/Pagination';
import SuspenseFallback from './SuspenseFallback';
import Select from './form/Select';
import Form from './form/Form';

interface Table {
	children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
	className?: string;
	header?: string | JSX.Element | JSX.Element[];
	footer?: string | JSX.Element | JSX.Element[];
	isRounded?: boolean;
	growTable?: boolean;
	type?: 'info' | 'buy' | 'sell';
	hasPagination?: boolean;
	totalItems?: number;
	currentPage?: number;
	onPageChange?: (e: number) => void;
	loading?: boolean;
	onSortsChange?: (e: any) => void;
	initialPageSize?: number;
	onPageSizeChange?: (e: number) => void;
	emptyDataMessage?: string;
	loadingMessage?: string;
	reload?: () => void;
}

interface TableFieldProps {
	children?: any;
	tag?: ElementType;
	className?: string;
	sortKey?: string;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

interface TableEditableField {
	children: any;
	className?: string;
	onEdit?: () => void;
}

interface TableSortableField {
	children: any;
	className?: string;
	sortKey: string;
	onSortsChange?: (e: any) => void;
}

interface TableRowProps extends React.HTMLAttributes<HTMLDivElement> {
	children: string | JSX.Element | JSX.Element[] | null | ReactNode | ReactNode[];
	type?: 'header' | 'body';
	className?: string;
	bgColor?: string;
	onSortsChange?: (e: any) => void;
	hasDropdown?: boolean;
	dropDownContainer?: ReactNode;
	onExapnd?: (e: boolean) => void;
}

interface TableEmptyFallback {
	children: string | JSX.Element | JSX.Element[];
	className?: string;
}

type sortsType = { [k: string]: string };

const TableField = ({
	tag = 'td',
	children,
	className,
	sortKey,
	onClick,
	...props
}: TableFieldProps) => {
	const Tag = tag as ElementType;

	const isTableChild = useMemo(() => {
		return Children.toArray(children)
			.map((child) => {
				if (child && isValidElement(child)) {
					return child.type === Table;
				}
				return null;
			})
			.every(Boolean);
	}, [children]);

	return (
		<Tag
			className={mergeClassNames(
				'text-center text-sm border-l border-base-300 whitespace-nowrap',
				{
					'px-4 py-2': !isTableChild,
				},
				className,
			)}
			onClick={onClick}
			{...props}
		>
			{children}
		</Tag>
	);
};

const TableEditableField = ({ className, children, onEdit }: TableEditableField) => {
	return (
		<TableField className={mergeClassNames(className, 'group px-8')}>
			<div className="flex justify-center items-center">
				<div className="relative w-fit">
					<span>{children}</span>
					<Icon
						onClick={onEdit}
						name="edit_black_24dp"
						className="absolute -left-1 -translate-x-full cursor-pointer w-5 text-primary group-hover:visible invisible"
					/>
				</div>
			</div>
		</TableField>
	);
};

const TableSortableField = ({
	sortKey,
	onSortsChange,
	sorts,
	className,
	children,
}: TableSortableField) => {
	const sortTypes = useRef(['', sortKey, `-${sortKey}`]);
	const sortCounter = useRef(0);

	useEffect(() => {
		const sort = sorts[sortKey];

		if (!sort) {
			sortCounter.current = 0;
		}
	}, [sorts]);

	const handleSortChange = useCallback(() => {
		sortCounter.current += 1;
		const currentSortType =
			sortTypes.current[sortCounter.current % sortTypes.current.length];

		onSortsChange?.({ [sortKey]: currentSortType });
	}, []);

	const showSortIcon = useMemo(() => {
		const sort = sorts[sortKey];

		switch (sort) {
			case sortTypes.current[0]:
				return <KheshtIcon name="exchange-outline" />;
			case sortTypes.current[1]:
				return <KheshtIcon name="keyboard-arrow-up-o" />;
			case sortTypes.current[2]:
				return <KheshtIcon name="keyboard-arrow-down-o" />;
			default:
				return <KheshtIcon name="exchange-outline" />;
		}
	}, [sortKey, sorts]);

	return (
		<TableField
			className={mergeClassNames(className, 'group px-8', {
				'cursor-pointer select-none': sortKey,
			})}
			{...(sortKey ? { onClick: handleSortChange } : null)}
		>
			<div className="relative w-full flex justify-center items-center">
				<div className="relative">
					<span className="font-bold">{children}</span>
					<div className="absolute -left-5 top-0">{showSortIcon}</div>
				</div>
			</div>
		</TableField>
	);
};

const TableRow = ({
	sorts,
	onSortsChange,
	type = 'body',
	className,
	children,
	bgColor,
	hasDropdown = false,
	dropDownContainer,
	onExapnd,
	...props
}: TableRowProps) => {
	const fieldTag = type === 'header' ? 'th' : 'td';

	const fieldChildren = useMemo(
		() =>
			Children.toArray(children)
				.filter((child: ReactNode) => {
					if (child && isValidElement(child)) {
						return (
							child.type === TableField ||
							child.type === TableEditableField ||
							child.type === TableSortableField
						);
					}
				})
				.map((child: ReactNode) => {
					if (child && isValidElement(child)) {
						return {
							...child,
							props: {
								...child.props,
								tag: fieldTag,
								...(child.type === TableSortableField ? { onSortsChange, sorts } : null),
							},
						};
					}
				}),
		[children],
	);

	const rowBgColor = useMemo(() => bgColor || 'bg-primary bg-opacity-30', [bgColor]);

	const [hasSelected, setHasSelected] = useState(false);

	const handleExpandChange = () => {
		onExapnd?.(!hasSelected);
		setHasSelected(!hasSelected);
	};

	return (
		<>
			<tr
				className={mergeClassNames(
					'border-b-200',
					{
						[rowBgColor]: type === 'header',
					},
					className,
				)}
				onClick={hasDropdown ? handleExpandChange : () => {}}
				{...props}
			>
				{fieldChildren}
			</tr>
			{hasDropdown && hasSelected ? (
				<tr className="">
					<td colSpan={fieldChildren.length}>
						<motion.div
							initial={{ height: 0 }}
							animate={{ height: 'auto' }}
							exit={{ height: 0, transition: { duration: 0.3 } }}
							transition={{ duration: 0.3 }}
							className="overflow-hidden"
						>
							{dropDownContainer}
						</motion.div>
					</td>
				</tr>
			) : null}
		</>
	);
};

TableRow.defaultProps = {
	type: 'body',
};

function TableEmptyFallback({ children, className, ...props }: TableEmptyFallback) {
	return (
		<div className={mergeClassNames(className)} {...props}>
			{children}
		</div>
	);
}

const Table = ({
	isRounded = true,
	header,
	footer,
	className,
	growTable = true,
	children,
	type = 'info',
	loading,
	loadingMessage = 'جدول درحال بارگذاری است',
	hasPagination = false,
	totalItems = 0,
	currentPage = 1,
	initialPageSize = 10,
	emptyDataMessage = 'داده‌ای برای نمایش وجود ندارد',
	onPageSizeChange,
	onPageChange,
	onSortsChange,
	reload,
	...props
}: Table) => {
	const [sorts, setSorts] = useState<sortsType>({});
	const [currentPageSize, setCurrentPageSize] = useState<number>(initialPageSize);

	const handleSortChange = useCallback(
		(currentSort: sortsType) => {
			const finalSorts = { ...currentSort };
			setSorts(finalSorts);
			onSortsChange?.(Object.values(finalSorts || {}).filter(Boolean));
		},
		[onSortsChange],
	);

	const headerChildren = useMemo(
		() =>
			Children.toArray(children)
				.filter((child) => {
					if (child && isValidElement(child)) {
						return child.type === TableRow && child.props.type === 'header';
					}
				})
				.map((child: ReactNode) => {
					if (child && isValidElement(child)) {
						return {
							...child,
							props: {
								...child.props,
								sorts: sorts,
								onSortsChange: handleSortChange,
							},
						};
					}
				}),
		[children],
	);

	const bodyChildren = useMemo(
		() =>
			Children.toArray(children).filter((child: ReactNode) => {
				if (child && isValidElement(child)) {
					return child.type === TableRow && child.props.type === 'body';
				}
			}),
		[children],
	);

	const emptyChildren = useMemo(
		() =>
			Children.toArray(children).filter((child) => {
				if (child && isValidElement(child)) {
					return child.type === TableEmptyFallback;
				}
			}),
		[children],
	);

	const color = useMemo(
		() =>
			({
				info: 'bg-primary bg-opacity-30',
				buy: 'bg-success-100 text-content',
				sell: 'bg-danger-100 text-content',
			}[type]),
		[type],
	);

	return (
		<div className="flex flex-col items-center gap-4 w-full relative">
			{reload ? (
				<div className="w-full flex justify-end">
					<div className="tooltip tooltip-right " data-tip="بروزرسانی جدول">
						<Button
							iconName="renew-o"
							outlined
							small
							circular
							disabled={loading}
							onClick={() => reload()}
						/>
					</div>
				</div>
			) : null}

			<div
				className={mergeClassNames('border border-base-300', {
					'rounded-md': isRounded,
					'w-full': growTable,
				})}
			>
				{header && typeof header === 'string' ? (
					<div
						className={mergeClassNames(
							'text-center font-bold p-4 border-b border-gray-400',
							color,
						)}
					>
						{header}
					</div>
				) : (
					header
				)}
				<div className="overflow-auto relative">
					<table
						className={mergeClassNames(
							'overflow-auto w-full bg-base-100 divide-y divide-base-200 text-base-content border',
							className,
						)}
						{...props}
					>
						{headerChildren.length > 0 ? (
							<thead className="h-14">{headerChildren}</thead>
						) : null}
						{bodyChildren?.length ? (
							<tbody className="table-body-container divide-y relative">
								{bodyChildren}
							</tbody>
						) : null}
						{loading ? (
							<tbody>
								<tr>
									<td
										colSpan={9999}
										className="absolute w-full h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									>
										<div className="w-full h-full">
											<SuspenseFallback
												message={loadingMessage}
												className="w-full h-full bg-opacity-80 rounded-none"
											/>
										</div>
									</td>
								</tr>
							</tbody>
						) : null}
					</table>

					{!(bodyChildren?.length > 0) && !loading ? (
						<div className="p-8">
							{emptyChildren.length ? (
								emptyChildren
							) : (
								<div className="flex justify-center items-center gap-1 px-4 text-sm md:text-lg">
									<div className="w-fit flex items-center gap-2">
										<span>{emptyDataMessage}</span>
										<Icon name="error_outline_black_24dp" className="w-6 md:w-8" />
									</div>
								</div>
							)}
						</div>
					) : null}
				</div>

				{footer && <div>{footer}</div>}
			</div>

			{bodyChildren?.length && onPageSizeChange ? (
				<div className="w-full md:w-fit flex justify-end md:absolute md:-bottom-1 md:left-0">
					<Form
						values={{
							page_size: { label: currentPageSize.toString(), value: currentPageSize },
						}}
					>
						<Select
							name="page_size"
							options={[
								{ label: '10', value: 10 },
								{ label: '25', value: 25 },
								{ label: '50', value: 50 },
							]}
							onChange={({ value }) => {
								setCurrentPageSize(value);
								onPageSizeChange?.(value);
							}}
							menuPosition="fixed"
						/>
					</Form>
				</div>
			) : null}

			<Pagination
				itemsPerPage={currentPageSize}
				currentPage={currentPage}
				setCurrentPage={onPageChange}
				totalItems={totalItems}
			/>
		</div>
	);
};

Table.Row = TableRow;
Table.Field = TableField;
Table.EditableField = TableEditableField;
Table.SortableField = TableSortableField;
Table.EmptyFallback = TableEmptyFallback;

export default Table;
