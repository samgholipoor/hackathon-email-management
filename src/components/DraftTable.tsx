import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import { useUserInfo } from '@/services/userInfo';
import DraftConfirmation, { DraftConfirmationProps } from './DraftConfirmation';
import Table from './Table';
import Form from './form/Form';
import Check from './form/Check';

interface tableRowItem {
	id: number;
	is_checked: boolean;
	[key: string]: unknown;
}

interface SelectedUserID {
	is_checked: boolean;
	id: number;
}

interface ActionProps {
	buttonText: string;
	buttonIcon: string;
	onClick: (...e: any) => void;
}

interface DraftTableProps extends DraftConfirmationProps {
	onChange: (e: number[]) => void;
	selectedItems: number[];
	tableHeaders: { title: string; isSortable?: boolean; sortKey?: string }[];
	tableBody: tableRowItem[];
	currentPage: number;
	setCurrentPage: (e: number) => void;
	onPageSizeChange?: (e: number) => void;
	totalItems: number;
	loading: boolean;
	onDismissAll?: () => Promise<any>;
	onPublishAll?: () => Promise<any>;
	isSelectable?: boolean;
	actions: ActionProps[];
	reload?: () => void;
	failedRecords?: (string | number)[];
	onSortsChange?: (e: any) => void;
}

const DraftTable = ({
	isSelectable = true,
	tableHeaders,
	tableBody,
	onDismiss,
	onPublish,
	onDismissAll,
	onPublishAll,
	onChange,
	currentPage,
	setCurrentPage,
	onPageSizeChange,
	totalItems,
	selectedItems,
	loading,
	actions,
	reload,
	failedRecords,
	onSortsChange,
}: DraftTableProps) => {
	const [isAllRowsChecked, setIsAllRowsChecked] = useState(false);
	const { identity } = useUserInfo();

	const handleChange = useCallback(
		(body: SelectedUserID) => {
			const { is_checked, id } = body as SelectedUserID;
			let newUserIDs = [...selectedItems];

			if (is_checked && !newUserIDs.includes(id)) {
				newUserIDs = [...newUserIDs, id];
			} else if (!is_checked && newUserIDs.includes(id)) {
				const index = newUserIDs.indexOf(id);

				newUserIDs = [...newUserIDs.slice(0, index), ...newUserIDs.slice(index + 1)];
			}

			onChange(newUserIDs);
		},
		[selectedItems],
	);

	const toggleAllRows = () => {
		if (isAllRowsChecked) {
			const allRowsID = [...tableBody].map((item) => item.id);
			onChange(allRowsID);
		} else {
			onChange([]);
		}
	};

	useEffect(() => {
		toggleAllRows();
	}, [isAllRowsChecked]);

	const selectedItemsCount = useMemo(() => {
		if (typeof selectedItems === 'object' && Array.isArray(selectedItems)) {
			return selectedItems.length;
		}
		return 0;
	}, [selectedItems]);

	const tableHeadersChildren = useMemo(() => {
		return (
			<Table.Row type="header" className="relative">
				{isSelectable ? (
					<Table.Field
						className={mergeClassNames('sticky top-0 right-0 bg-base-100 !p-0')}
					>
						<Form
							values={{ all_rows_is_checked: isAllRowsChecked }}
							isForceUpdate
							className="bg-primary bg-opacity-30 w-full h-full p-2"
						>
							<Check
								className="flex items-center justify-center"
								name="all_rows_is_checked"
								options={[{ value: true, title: '' }]}
								onChange={(all_rows_is_checked) => {
									setIsAllRowsChecked(!!all_rows_is_checked);
								}}
							/>
						</Form>
					</Table.Field>
				) : null}
				{tableHeaders.map(({ title, isSortable, sortKey }) =>
					isSortable ? (
						<Table.SortableField sortKey={sortKey} key={title}>
							{title}
						</Table.SortableField>
					) : (
						<Table.Field key={title}>{title}</Table.Field>
					),
				)}
				{actions?.length > 0 ? <Table.Field /> : null}
			</Table.Row>
		);
	}, [tableHeaders, isAllRowsChecked, isSelectable]);

	const TableBodyChildren = useMemo(() => {
		return tableBody.map((tableRowItem: tableRowItem) => {
			const {
				is_vesting_records_enough,
				is_checked = false,
				id,
				rest = {},
				...items
			} = tableRowItem;
			const values = Object.values(items);

			const fields = values.map((value, index) => (
				<Table.Field key={index}>{value}</Table.Field>
			));

			if (actions?.length > 0) {
				fields.push(
					<Table.Field>
						<div className="flex justify-center gap-2">
							{actions.map((action) => (
								<Button
									key={`${action.buttonText}-${action.buttonIcon}`}
									iconName={action.buttonIcon}
									onClick={action.onClick.bind(null, {
										...tableRowItem,
										...(rest || {}),
									})}
								>
									{action.buttonText}
								</Button>
							))}
						</div>
					</Table.Field>,
				);
			}

			return (
				<Table.Row
					key={tableRowItem.id}
					className={mergeClassNames('relative', {
						'bg-yellow-500 bg-opacity-15':
							identity.is_super_admin &&
							is_vesting_records_enough === false &&
							!is_checked &&
							!failedRecords?.includes(id),
						'bg-primary bg-opacity-10': is_checked,
						'bg-red-500 bg-opacity-35': failedRecords?.includes(id) && !is_checked,
					})}
				>
					{isSelectable ? (
						<Table.Field
							className={mergeClassNames(
								'sticky top-0 right-0 flex justify-center items-center bg-base-100 !p-0',
							)}
						>
							<Form
								values={{ all_rows_is_checked: isAllRowsChecked || is_checked }}
								isForceUpdate
								className={mergeClassNames('w-full p-2', {
									'bg-primary bg-opacity-10': is_checked,
									'bg-base-100': !is_checked,
									'bg-yellow-500 bg-opacity-15':
										identity.is_super_admin &&
										is_vesting_records_enough === false &&
										!is_checked &&
										!failedRecords?.includes(id),
									'bg-red-500 bg-opacity-35': failedRecords?.includes(id) && !is_checked,
								})}
							>
								<Check
									name="all_rows_is_checked"
									className="flex justify-center items-center"
									options={[{ value: true, title: '' }]}
									onChange={(v) => {
										handleChange({ is_checked: !!v, id: id });
									}}
								/>
							</Form>
						</Table.Field>
					) : null}
					{fields}
				</Table.Row>
			);
		});
	}, [failedRecords, identity, tableBody, isAllRowsChecked, isSelectable]);

	const handlePublishAll = () => {
		const result = confirm('آیا از تایید تمامی رکوردها مطمئن هستید؟');
		if (result) {
			onPublishAll?.().then(() => {
				setIsAllRowsChecked(false);
				onChange([]);
			});
		}
	};

	const handleDismissAll = () => {
		const result = confirm('آیا از رد تمامی رکوردها مطمئن هستید؟');
		if (result) {
			onDismissAll?.().then(() => {
				setIsAllRowsChecked(false);
				onChange([]);
			});
		}
	};

	const handlePublish = () => {
		const result = confirm('آیا از تایید و انتشار مطمئن هستید؟');
		if (result) {
			onPublish().then(() => {
				setIsAllRowsChecked(false);
				onChange([]);
			});
		}
		return Promise.reject();
	};

	const handleDismiss = () => {
		const result = confirm('آیا از رد کردن مطمئن هستید؟');
		if (result) {
			onDismiss().then(() => {
				setIsAllRowsChecked(false);
				onChange([]);
			});
		}
		return Promise.reject();
	};

	return (
		<div>
			{selectedItemsCount > 0 ? (
				<DraftConfirmation onDismiss={handleDismiss} onPublish={handlePublish}>
					<div className="flex flex-col gap-2">
						<Button iconName="person">کل افراد {totalItems?.toString()}</Button>
						<Button iconName="add-person-o">
							انتخاب‌شده {selectedItemsCount.toString()}
						</Button>
					</div>
				</DraftConfirmation>
			) : null}
			<Table
				currentPage={currentPage}
				onPageChange={setCurrentPage}
				onPageSizeChange={onPageSizeChange}
				totalItems={totalItems}
				loading={loading}
				onSortsChange={onSortsChange}
				reload={reload}
			>
				{tableHeadersChildren}
				{TableBodyChildren}
			</Table>

			{isSelectable && totalItems > 0 ? (
				<div className="bg-base-200 p-4 rounded-md my-8">
					<div className="flex flex-col md:flex-row gap-2">
						<Button onClick={handlePublishAll} iconName="check-circle" primary>
							تایید همه
						</Button>
						<Button onClick={handleDismissAll} iconName="remove-circle-o">
							رد همه
						</Button>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default DraftTable;
