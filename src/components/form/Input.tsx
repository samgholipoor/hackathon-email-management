import { ChangeEvent, ReactNode, useCallback, useMemo } from 'react';
import { TextField, TextArea } from '@khesht/react';
import { Label, useFormField } from '@/components/form/Form';
import { formatNumber, formatToEnglishDigits } from '@/utils/formatNumber';
import { mergeClassNames } from '@/utils/classname';
import FormError from './FormError';

interface Input {
	label?: string;
	placeholder?: string;
	multiline?: boolean;
	type?: string;
	className?: string;
	inputClassName?: string;
	name?: string;
	value?: string | number;
	validator?: ((e: any) => string | boolean)[];
	formatter?: (e: any) => any;
	icon?: string;
	onIconClick?: () => void;
	suffix?: string;
	onChange?: (e: any) => void;
	clearable?: boolean;
	hasSeparateLabel?: boolean;
	isDisabled?: boolean;
	children?: ReactNode | null;
}

const Input = ({
	label = '',
	placeholder = '',
	multiline = false,
	type = 'text',
	className,
	inputClassName,
	icon,
	onIconClick,
	suffix,
	onChange,
	clearable = false,
	hasSeparateLabel = false,
	isDisabled = false,
	formatter,
	children = null,
	...fieldProps
}: Input) => {
	const {
		id,
		value,
		onChange: onChangeForm,
		error,
		disabled: isFormDisabled,
		...props
	} = useFormField({ formatter, ...fieldProps } as any, '');

	const Tag = multiline ? TextArea : TextField;

	const formattedValue = useMemo(() => {
		if (typeof value === 'undefined' || value === null) {
			return '';
		}

		if (typeof value === 'string') {
			return type === 'number' ? formatNumber(value, '0') : value;
		}

		return type === 'number' ? formatNumber(value.toString(), '0') : value.toString();
	}, [value, multiline]);

	const handleChange = useCallback(
		(e: string | ChangeEvent<HTMLInputElement>) => {
			let newValue = multiline ? e.target.value : e;

			if (type === 'number') {
				newValue = newValue.split(',').join('');
				newValue = Number(formatToEnglishDigits(newValue));
			}
			onChange?.(newValue);
			onChangeForm(newValue);
		},
		[multiline, onChangeForm],
	);

	const filterType = useMemo(() => (type === 'password' ? 'password' : 'text'), [type]);

	return (
		<div className={mergeClassNames(className, 'w-full flex flex-col')}>
			{hasSeparateLabel && label ? <Label label={label} className="mb-4" /> : null}
			<Tag
				endIcon={icon}
				endIconProps={{
					onClick: onIconClick,
					className: 'cursor-pointer',
				}}
				id={id}
				value={formattedValue}
				onChange={handleChange}
				placeholder={hasSeparateLabel ? '' : label || placeholder}
				disabled={isFormDisabled || isDisabled}
				type={filterType}
				hasError={!!error}
				labeled={!hasSeparateLabel}
				suffix={suffix}
				clearable={clearable}
				className={inputClassName}
				{...props}
			/>
			{children ? children(formattedValue) : null}
			{error ? <FormError>{error}</FormError> : null}
		</div>
	);
};

export default Input;
