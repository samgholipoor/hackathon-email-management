import { ElementType, useMemo } from 'react';
import { mergeClassNames } from '@/utils/classname';
import Icon from '@/components/Icon';
import { Spinner } from '@/components/Spinner';

interface ButtonProps {
	component?: React.ElementType;
	icon?: string;
	disabled?: boolean;
	selected?: boolean;
	color?: 'normal' | 'primary' | 'danger';
	size?: 'sm' | 'md';
	square?: boolean;
	transparent?: boolean;
	className?: string;
	children?: string | string[] | JSX.Element | JSX.Element[] | null;
	loading?: boolean;
	to?: string;
	type?: 'submit' | 'reset' | 'button';
	isFullWidth?: boolean;
	onClick?: (e: any) => void;
}

export default function Button({
	component = 'button',
	icon = '',
	disabled = false,
	selected = false,
	color = 'normal',
	size = 'md',
	square = false,
	transparent,
	className,
	children,
	loading = false,
	isFullWidth = false,
	...props
}: ButtonProps) {
	const Component = component as ElementType;

	const colorClass = useMemo(
		() =>
			({
				normal: !selected && 'bg-gray-500',
				primary: !selected && 'text-primary bg-primary',
				danger: !selected && 'text-red-500 bg-red-500',
			}[color]),
		[color, selected],
	);

	const sizeClass = useMemo(
		() =>
			({
				md: mergeClassNames('h-10 text-sm', square && 'w-10'),
				sm: mergeClassNames('h-8 text-sm', square && 'w-8'),
			}[size]),
		[size],
	);

	const iconSizeClass = useMemo(
		() =>
			({
				md: 'w-5 h-5',
				sm: 'w-4 h-4',
			}[size]),
		[size],
	);

	return (
		<Component
			className={mergeClassNames(
				'inline-flex items-center justify-center gap-2 rounded-md duration-150 whitespace-nowrap font-semibold relative overflow-hidden select-none',
				{ 'w-full': isFullWidth },
				transparent ? 'bg-opacity-0' : 'bg-opacity-10',
				!square && 'px-3',
				sizeClass,
				colorClass,
				!disabled &&
					!selected &&
					'hover:bg-opacity-20 focus:bg-opacity-25 active:bg-opacity-30 cursor-pointer',
				!disabled &&
					selected &&
					'bg-primary text-primary-content bg-opacity-100 cursor-default',
				disabled && 'text-base-content text-opacity-40 bg-opacity-0 cursor-not-allowed',
				className,
			)}
			disabled={loading || disabled}
			{...props}
		>
			{loading && <Spinner className={iconSizeClass} />}
			{!loading && icon && <Icon name={icon} className={iconSizeClass} />}
			{children && <span>{children}</span>}
		</Component>
	);
}
