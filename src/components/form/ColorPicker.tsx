import { ChangeEvent, useCallback } from 'react';
import { Label, useFormField } from '@/components/form/Form';
import FormError from './FormError';

interface ColorPickerProps {
	label?: string;
	name?: string;
	className?: string;
	onChange?: (e: any) => void;
	isDisabled?: boolean;
}

const ColorPicker = ({
	label = '',
	className,
	onChange,
	isDisabled = false,
	...fieldProps
}: ColorPickerProps) => {
	const {
		id,
		value,
		onChange: onChangeForm,
		error,
		isDisabled: isFormDisabled,
		...props
	} = useFormField({ ...fieldProps } as any, '');

	const handleChange = useCallback((e: string | ChangeEvent<HTMLInputElement>) => {
		const colorHEX = e.target.value;
		onChange?.(colorHEX);
		onChangeForm(colorHEX);
	}, []);

	return (
		<div className="w-full flex flex-col gap-2">
			{label ? <Label label={label} /> : null}
			<input
				id={id}
				type="color"
				value={value}
				onChange={handleChange}
				disabled={isFormDisabled || isDisabled}
				{...props}
			/>
			{error ? <FormError>{error}</FormError> : null}
		</div>
	);
};

export default ColorPicker;
