import { useCallback, useEffect, useMemo, useState } from 'react';
import SelectOptions, { GroupBase } from 'react-select';
import { SelectComponents } from 'react-select/dist/declarations/src/components';
import { mergeClassNames } from '@/utils/classname';
import { useFormField } from './Form';
import FormError from './FormError';

export interface SelectOptionsProps {
	label: string;
	value: string | number;
}

interface Select {
	className?: string;
	label?: string;
	defaultValue?: SelectOptionsProps | SelectOptionsProps[];
	options: SelectOptionsProps[];
	multiple?: boolean;
	name?: string;
	placeholder?: string;
	loading?: boolean;
	validator?: ((e: any) => string | boolean)[];
	noOptionsMessage?: string;
	clearable?: boolean;
	formatter?: (e: any) => any;
	disabled?: boolean;
	onInputChange?: (e: any) => void;
	onChange?: (e: { value: number; label: string } | undefined) => void;
	defaultError?: string;
	enterCustomInput?: boolean;
	CustomOption?: JSXElementConstructor | null;
	components?: Partial<SelectComponents<any, true, GroupBase<unknown>>>;
	selectKey?: number;
	menuPosition?: 'absolute' | 'fixed';
}

const formatInput = (selectedOptions: SelectOptionsProps | SelectOptionsProps[]) => {
	if (selectedOptions && Array.isArray(selectedOptions)) {
		return selectedOptions.map((selectedOption) => selectedOption.value);
	} else if (selectedOptions && typeof selectedOptions === 'object') {
		return selectedOptions.value;
	} else {
		return selectedOptions;
	}
};

export default function Select({
	className,
	// label = '',
	defaultValue,
	options = [],
	multiple = false,
	placeholder,
	loading,
	onChange,
	noOptionsMessage,
	clearable = false,
	formatter,
	onInputChange,
	disabled: forceDisabled,
	defaultError,
	enterCustomInput = false,
	CustomOption = null,
	components = {},
	selectKey = 1,
	menuPosition = 'absolute',
	...formFieldProps
}: Select) {
	const {
		id,
		value,
		onChange: onChangeForm,
		error,
		disabled,
		...props
	} = useFormField(
		{
			formatter: formatter || formatInput,
			...(formFieldProps as any),
		},
		multiple ? [] : undefined,
	);

	const [newOptions, setNewOptions] = useState(options);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (!enterCustomInput) {
			setNewOptions(options);
		}
	}, [options]);

	useEffect(() => {
		if (enterCustomInput) {
			setNewOptions(() => {
				if (inputValue) {
					return [{ label: inputValue, value: inputValue, temp: true }, ...options];
				} else {
					return options;
				}
			});
		}
	}, [enterCustomInput, options, inputValue]);

	const handleChange = useCallback(
		(selectedOptions: any) => {
			onChange?.(selectedOptions || {});
			return onChangeForm(selectedOptions);
		},
		[multiple, value, onChangeForm, onChange],
	);

	const _value = useMemo(() => {
		if (!value) {
			return null;
		}

		if (typeof value === 'number' || typeof value === 'string') {
			return options.find((option) => option.value === value) || null;
		}

		return value;
	}, [value, options, multiple]);

	const renderError = (err: string | object[]) => {
		if (typeof err === 'string') {
			return err;
		}

		if (Array.isArray(err) && err.length) {
			let str = '';
			for (let index = 0; index < err.length; index++) {
				if (typeof err[index] === 'string') {
					return (str += err[index]);
				}

				const val = Object.values(err[index]);
				if (typeof val === 'string') {
					str += val + '\n';
				} else if (Array.isArray(val)) {
					str += val.join('\n') + '\n';
				}
			}
			return str;
		}

		return null;
	};

	const handleInputChange = (e) => {
		onInputChange?.(e);
		setInputValue(e);
	};

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			<SelectOptions
				key={selectKey}
				defaultValue={defaultValue}
				options={newOptions}
				value={_value}
				onInputChange={handleInputChange}
				onChange={handleChange}
				theme={(theme) => ({
					...theme,
					colors: {
						...theme.colors,
						primary: '#91268E',
						primary25: '#91268e33',
						primary50: '#91268e4d',
					},
				})}
				styles={{
					control: (baseStyles, state) => ({
						...baseStyles,
						borderColor: 'border-base-300',
						boxShadow: '0',
						background: state.isDisabled ? '#fff' : '',
					}),
				}}
				className="w-full"
				placeholder={placeholder}
				isDisabled={disabled || forceDisabled}
				isLoading={loading}
				isClearable={clearable}
				loadingMessage={() => 'درحال بارگذاری...'}
				noOptionsMessage={() => noOptionsMessage || 'گزینه‌ای یافت نشد'}
				components={components}
				menuPosition={menuPosition}
				{...(multiple ? { isMulti: true } : null)}
			/>
			{error ? <FormError>{renderError(error)}</FormError> : null}
			{defaultError ? <FormError>{renderError(defaultError)}</FormError> : null}
		</div>
	);
}
