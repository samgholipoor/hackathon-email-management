import { Children, ReactNode, isValidElement, useMemo } from 'react';
import { Tabs as TabsList } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import useUpdateHashRoute from '@/hooks/useUpdateHashRoute';
import Icon from './Icon';

interface TabItem {
	title: string;
	iconName?: string;
	hasIndicator?: boolean;
}

interface Tabs {
	children: JSX.Element | JSX.Element[] | ReactNode;
	className?: string;
	startedTabIndex?: number;
	tabItems: TabItem[];
	containerClassName?: string;
	onChange?: (e: any) => void;
	padded?: boolean;
	style?: any;
	enableRouteHash?: boolean;
	tabIndex?: number;
}

interface TabContainer {
	children?: string | JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
	className?: string;
}

const TabContainer = ({ children, ...props }: TabContainer) => {
	return (
		<div {...props}>
			{children || (
				<div className="flex justify-center items-center p-10 gap-2 text-base-content">
					<span>این صفحه در دست ساخت میباشد</span>
					<Icon name="info_black_24dp" className="w-8" />
				</div>
			)}
		</div>
	);
};

const Tabs = ({
	tabItems,
	children,
	tabIndex,
	onChange,
	startedTabIndex = 0,
	containerClassName,
	padded = true,
	className,
	enableRouteHash = true,
	...props
}: Tabs) => {
	const [hash, setHash] = useUpdateHashRoute(
		startedTabIndex.toString(),
		(x) => Number(x.slice(1)?.split('/')?.[0]) || 0,
	);

	const panelsList = useMemo(
		() =>
			Children.toArray(children)
				.filter((child: ReactNode) => {
					if (child && isValidElement(child)) {
						return child.type === TabContainer;
					}
				})
				.map((child) => child.props.children)
				.flat()
				.filter(Boolean),
		[children],
	);

	const currentPanel = useMemo(
		() =>
			panelsList.filter((_, index) => {
				if (enableRouteHash) {
					return index === hash;
				} else {
					return index === tabIndex;
				}
			}),
		[children, panelsList, hash, enableRouteHash, tabIndex],
	);

	return (
		<div className={mergeClassNames(className, 'w-full')} {...props}>
			<TabsList
				items={tabItems}
				selectedTabIndex={enableRouteHash ? hash : tabIndex}
				onChange={(n: number) => {
					onChange?.(n);
					if (enableRouteHash) {
						setHash(n?.toString(), false);
					}
				}}
				hasDivider
			/>

			<div>
				{currentPanel?.length ? (
					<div className={mergeClassNames(containerClassName, { 'p-4': padded })}>
						{currentPanel}
					</div>
				) : (
					<div className="flex justify-center items-center gap-1 p-4">
						<span>صفحه ای برای این تب وجود ندارد!</span>
						<Icon name="error_outline_black_24dp" className="h-8 w-8" />
					</div>
				)}
			</div>
		</div>
	);
};

Tabs.TabContainer = TabContainer;

export default Tabs;
