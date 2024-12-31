import { ChangeEvent, ReactNode, useCallback, useMemo } from 'react';
import { TextField } from '@khesht/react';
import { Label, useFormField } from '@/components/form/Form';
import { formatToEnglishDigits } from '@/utils/formatNumber';
import { mergeClassNames } from '@/utils/classname';
import FormError from './FormError';

interface InputNumberProps {
	label?: string;
	placeholder?: string;
	multiline?: boolean;
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

const InputNumber = ({
	label = '',
	placeholder = '',
	multiline = false,
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
}: InputNumberProps) => {
	const {
		id,
		value,
		onChange: onChangeForm,
		error,
		disabled: isFormDisabled,
		...props
	} = useFormField({ formatter, ...fieldProps } as any, '');

	const formattedValue = useMemo(() => {
		if (typeof value === 'undefined' || value === null) {
			return '';
		}

		return value.toString();
	}, [value, multiline]);

	const isNumericInput = (input: string) => {
		const numericRegex = /^[0-9]*$/;
		return numericRegex.test(input);
	};

	const handleChange = useCallback(
		(e: string | ChangeEvent<HTMLInputElement>) => {
			const englishDigitsValue = formatToEnglishDigits(e);
			if (isNumericInput(englishDigitsValue)) {
				onChange?.(englishDigitsValue);
				onChangeForm(englishDigitsValue);
			}
		},
		[multiline, onChangeForm],
	);

	return (
		<div className={mergeClassNames(className, 'w-full flex flex-col')}>
			{hasSeparateLabel && label ? <Label label={label} className="mb-4" /> : null}
			<TextField
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
				type="text"
				inputmode="numeric"
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

export default InputNumber;
