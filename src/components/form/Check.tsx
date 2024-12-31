import { useCallback, useMemo } from 'react';
import { Switch } from '@khesht/react';
import { Label, useFormField } from '@/components/form/Form';
import { mergeClassNames } from '@/utils/classname';
import FormError from './FormError';

export interface CheckProps {
	className?: string;
	containerClassName?: string;
	label: string;
	options: { title: string; value: any }[];
	multiple?: boolean;
	name?: string;
	onChange?: (e: any) => void;
	validator?: ((e: any) => string | boolean)[];
	type?: 'radio' | 'checkbox';
}

const Check = ({
	className,
	containerClassName,
	label = '',
	options = [],
	onChange,
	multiple = false,
	type = 'checkbox',
	...fieldProps
}: CheckProps) => {
	const {
		id,
		value,
		onChange: onChangeForm,
		error,
		disabled,
		...props
	} = useFormField(fieldProps as any, multiple ? [] : undefined);

	const optionsObject = useMemo(
		() =>
			options.map((option) => {
				const { title, value: optionValue } = option;
				const isChecked = multiple ? value.includes(optionValue) : optionValue === value;
				return {
					title,
					value: optionValue,
					isChecked,
				};
			}),
		[options, value, multiple],
	);

	const handleChange = useCallback(
		(optionValue: string) => {
			let newValue = value;
			if (multiple) {
				const index = value.indexOf(optionValue);
				if (index > -1) {
					newValue = [...value.slice(0, index), ...value.slice(index + 1)];
				} else {
					newValue = [...value, optionValue];
				}
			} else if (value === optionValue) {
				newValue = undefined;
			} else {
				newValue = optionValue;
			}
			onChange?.(newValue);
			return onChangeForm(newValue);
		},
		[value, multiple, onChangeForm],
	);

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			<Label label={label} />
			<div className={mergeClassNames('flex items-center gap-1', containerClassName)}>
				{optionsObject.map((option) => (
					<div key={option.title}>
						<Switch
							checked={option.isChecked}
							onChange={() => handleChange(option.value)}
							label={option.title}
							type={type}
							disabled={disabled}
						/>
					</div>
				))}
			</div>
			{error ? <FormError>{error}</FormError> : null}
		</div>
	);
};

export default Check;
