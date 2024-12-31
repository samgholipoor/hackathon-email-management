import { useMemo } from 'react';
import { Toggle as T } from '@khesht/react';
import { useFormField } from '@/components/form/Form';
import { mergeClassNames } from '@/utils/classname';
import FormError from './FormError';

interface ToggleProps {
	label?: string;
	className?: string;
	value?: any;
	onChange?: (e: boolean) => void;
	name?: string;
	type?: 'toggle' | 'checkbox';
}

const Toggle = ({
	label,
	value,
	onChange,
	className,
	type,
	...fieldProps
}: ToggleProps) => {
	const {
		id,
		value: valueForm,
		onChange: onFormChange,
		error,
		disabled,
		...props
	} = useFormField(fieldProps as any, false);

	const inputValue = useMemo(() => {
		if (value !== undefined && value !== null) {
			return value;
		}
		return valueForm;
	}, [value, valueForm]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		onFormChange(checked);
		onChange?.(checked);
	};

	return (
		<div className={mergeClassNames(className)} {...props}>
			<T
				id={id}
				checked={inputValue}
				onChange={handleChange}
				disabled={disabled}
				type={type}
			>
				<div className="ml-2">{label}</div>
			</T>
			{error ? <FormError>{error}</FormError> : null}
		</div>
	);
};

export default Toggle;
