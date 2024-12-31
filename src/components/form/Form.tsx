import {
	useReducer,
	useCallback,
	useMemo,
	useEffect,
	createContext,
	useContext,
	ReactNode,
} from 'react';
import { mergeClassNames } from '@/utils/classname';
import { generateUUID } from '@/utils/uuid';
import Icon from '../Icon';

export const FormContext = createContext(null);
export const FormProvider = FormContext.Provider;

export function useForm() {
	const form = useContext(FormContext);

	if (!form) {
		throw new Error('Form doest exist!!');
	}

	return form;
}

const actionTypes = {
	SET_VALUES: 'SET_VALUES',
	SET_FIELD_VALUE: 'SET_FIELD_VALUE',
	SET_ERRORS: 'SET_ERRORS',
	SET_FIELD_ERROR: 'SET_FIELD_ERROR',
	SET_FIELD_FORMATTER: 'SET_FIELD_FORMATTER',
	SET_FIELD_VALIDATOR: 'SET_FIELD_VALIDATOR',
	SET_ISSUMBITTING: 'SET_ISSUMBITTING',
	RESET_FORM: 'RESET_FORM',
};

interface InitialValues {
	values: object;
	errors: object;
	formatters: object;
	validators: object;
	isSubmitting: boolean;
}

const initialValues: InitialValues = {
	values: {},
	errors: {},
	formatters: {},
	validators: {},
	isSubmitting: false,
};

interface Action {
	payload?: any;
	type: string;
}

function formReducer(state: InitialValues, action: Action) {
	switch (action.type) {
		case 'SET_VALUES':
			return { ...state, values: action.payload };
		case 'SET_FIELD_VALUE':
			return {
				...state,
				values: { ...state.values, [action.payload.field]: action.payload.value },
			};
		case 'SET_ERRORS':
			return { ...state, errors: { ...action.payload } };
		case 'SET_FIELD_ERROR':
			return {
				...state,
				errors: { ...state.errors, [action.payload.field]: action.payload.value },
			};
		case 'SET_FIELD_FORMATTER':
			return {
				...state,
				formatters: { ...state.formatters, [action.payload.field]: action.payload.value },
			};
		case 'SET_FIELD_VALIDATOR':
			return {
				...state,
				validators: { ...state.validators, [action.payload.field]: action.payload.value },
			};
		case 'SET_ISSUMBITTING':
			return { ...state, isSumbitting: action.payload };
		case 'RESET_FORM':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

interface FormProps {
	values: object;
	formatters?: object;
	validators?: object;
	action?: (s: any) => Promise<any>;
	onSuccess?: (s: any) => void;
	onReject?: (s: any) => void;
	onChange?: (s: any) => any;
	className?: string;
	children: null | JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
	manual?: boolean;
	disabled?: boolean;
	isForceUpdate?: boolean;
	errors?: { [k: string]: string };
	dependenies?: { [k: string]: string[] };
}

function Form({
	values = {},
	formatters = {},
	validators = {},
	action = () => Promise.reject(),
	onSuccess = () => {},
	onReject = () => {},
	children = null,
	manual = false,
	disabled = false,
	isForceUpdate,
	errors,
	onChange,
	className,
	dependenies = {},
}: FormProps) {
	const [state, dispatch] = useReducer(formReducer, {
		...initialValues,
		values,
		formatters,
		validators,
	});

	const Component = manual ? 'div' : 'form';

	useEffect(() => {
		onChange?.(state.values);
	}, [state.values]);

	useEffect(() => {
		if (isForceUpdate && values !== state.values) {
			dispatch({
				type: actionTypes.SET_VALUES,
				payload: values,
			});
		}
	}, [values]);

	useEffect(() => {
		if (errors && errors !== state.errors) {
			Object.entries(errors || {}).forEach(([field, value]) => {
				dispatch({
					type: actionTypes.SET_FIELD_ERROR,
					payload: { field, value },
				});
			});
		}
	}, [errors]);

	useEffect(() => {
		dispatch({
			type: actionTypes.SET_ERRORS,
			payload: {},
		});
	}, [state?.values]);

	const handleResetDependencies = useCallback(
		(formData: any, fieldName: string) => {
			const currentDependenies = dependenies?.[fieldName];

			if (Array.isArray(currentDependenies) && currentDependenies.length > 0) {
				currentDependenies.forEach((dependencyKey) => {
					delete formData?.[dependencyKey];
				});
			}
			return formData;
		},
		[dependenies],
	);

	const handleChange = useCallback(
		(field: string, value: any) => {
			if (dependenies) {
				const newValue = handleResetDependencies(state.values, field);
				dispatch({
					type: actionTypes.SET_VALUES,
					payload: {
						...newValue,
						[field]: value,
					},
				});
			} else {
				dispatch({ type: actionTypes.SET_FIELD_VALUE, payload: { field, value } });
			}
		},
		[dispatch, state.values, values, handleResetDependencies, dependenies],
	);

	const validatorHandler = useCallback(
		async (
			field: string,
			value: any,
			validatorFns: ((s: any) => Promise<string> | Promise<boolean> | boolean | string)[],
		) => {
			if (validatorFns && validatorFns.length > 0) {
				for (let i = 0; i < validatorFns.length; i += 1) {
					const validatorFn = validatorFns[i];

					if (typeof validatorFn !== 'function') continue;
					let validatorResult = validatorFn(value);

					if (validatorResult instanceof Promise) {
						validatorResult = await validatorResult;
					}

					if (validatorResult !== true) {
						dispatch({
							type: actionTypes.SET_FIELD_ERROR,
							payload: {
								field,
								value: validatorResult || 'InValid Value!!',
							},
						});
						return false;
					}
				}
			}
			return true;
		},
		[state?.validators, state?.values],
	);

	const runAllValidatorsAndCheck = useCallback(
		async (formData: any) => {
			const validationResult = Object.entries(formData).map(([key, value]) =>
				validatorHandler(key, value, state.validators[key] as any),
			);
			const resolvedValidationResult = await Promise.all(validationResult);
			return resolvedValidationResult.every(Boolean);
		},
		[state?.values, state?.errors],
	);

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.stopPropagation();
			e.preventDefault();

			let sendObj = {};

			Object.keys(state.values).forEach((fieldName) => {
				const formatter = Object.hasOwnProperty.call(state.formatters, fieldName)
					? state.formatters[fieldName]
					: (x: any) => x;
				const fieldValue = formatter(state.values[fieldName]);
				sendObj = {
					...sendObj,
					[fieldName]: fieldValue,
				};
			});

			const isValidForm = await runAllValidatorsAndCheck(sendObj);

			if (!isValidForm) {
				const err: any = new Error('inValid Value has been inserted!!');
				err.status = 400;
				onReject(err);
			} else {
				action(sendObj)
					.then(onSuccess)
					.catch((err) => {
						if (err?.status === 400) {
							Object.entries(err?.body?.data || {}).forEach(([field, value]) => {
								dispatch({
									type: actionTypes.SET_FIELD_ERROR,
									payload: { field, value },
								});
							});
						}
						onReject(err);
					});
			}
		},
		[action, onSuccess, onReject, state.values, state.validators, dispatch],
	);

	const providerValues = useMemo(
		() => ({
			values: state.values,
			setValue: handleChange,
			errors: state.errors,
			setError: (field: string, value: any) =>
				dispatch({ type: actionTypes.SET_FIELD_ERROR, payload: { field, value } }),
			formatters: state.formatters,
			setFormatter: (field: string, value: any) =>
				dispatch({ type: actionTypes.SET_FIELD_FORMATTER, payload: { field, value } }),
			validators: state.validators,
			setValidator: (field: string, value: any) =>
				dispatch({ type: actionTypes.SET_FIELD_VALIDATOR, payload: { field, value } }),
			disabled,
		}),
		[state.values, state.errors, state.formatters, state.validators, disabled],
	);

	return (
		<FormProvider value={providerValues as any}>
			<Component className={className} onSubmit={handleSubmit}>
				{children}
			</Component>
		</FormProvider>
	);
}

export default Form;

interface Label {
	label?: string;
	htmlFor?: string;
	className?: string;
	children?: JSX.Element | JSX.Element[];
	icon?: string;
	onIconClick?: () => void;
}

export const Label = ({
	label,
	htmlFor,
	className,
	icon,
	onIconClick,
	children,
}: Label) => (
	<label
		htmlFor={htmlFor}
		className={mergeClassNames(className, 'flex flex-col items-start gap-1')}
	>
		{label ? (
			<div className="flex justify-between items-center w-full">
				<span>{label}</span>
				{icon ? (
					<Icon
						name={icon}
						onClick={(e) => {
							e.stopPropagation();
							onIconClick();
						}}
						className="w-5 h-5 cursor-pointer"
					/>
				) : null}
			</div>
		) : null}
		{children}
	</label>
);

const emptyFn = () => {};
const trueFn = () => true;
const returnArgFn = (x: any) => x;

export interface useFieldFormProps {
	name?: string;
	value?: any;
	onChange?: (e: any) => void;
	formatter?: (e: any) => void;
	validator?: ((e: any) => void)[];
}

export function useFormField(
	{
		name,
		value: propsValue,
		onChange: propsOnChange = emptyFn,
		formatter = returnArgFn,
		validator = trueFn,
		...props
	} = {} as useFieldFormProps,
	defaultValue,
) {
	const parentForm = useForm();
	const id = useMemo(() => generateUUID(), []);

	const disabled = useMemo(() => parentForm.disabled, [parentForm.disabled]);

	const value = useMemo(() => {
		if (parentForm?.values && name) {
			return parentForm?.values[name] || defaultValue;
		}
		return propsValue;
	}, [parentForm?.values, name, propsValue]);

	const onChange = useCallback(
		(newValue) => {
			if (parentForm?.setValue && name) {
				return parentForm?.setValue(name, newValue);
			}
			return propsOnChange(value);
		},
		[parentForm?.setValue, name, propsOnChange],
	);

	const error = useMemo(() => parentForm?.errors?.[name], [parentForm?.errors, name]);

	useEffect(() => {
		if (formatter) {
			parentForm?.setFormatter(name, formatter);
		}
	}, [formatter]);

	useEffect(() => {
		if (validator) {
			parentForm?.setValidator(name, validator);
		}
	}, [validator]);

	return useMemo(
		() => ({
			id,
			value,
			onChange,
			error,
			disabled,
			...props,
		}),
		[id, value, onChange, error, props],
	);
}
