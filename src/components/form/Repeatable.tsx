import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { Button } from '@khesht/react';
import { generateUUID } from '@/utils/uuid';
import { mergeClassNames } from '@/utils/classname';
import Form, { useFormField, useFieldFormProps, Label } from './Form';
import FormError from './FormError';

interface Props extends useFieldFormProps {
	className?: string;
	children: ReactNode | ReactNode[];
	defaultValue?: any;
	hasRemoveButton?: boolean;
	hasAddButton?: boolean;
	onChangeHandler?: (e: any) => void;
}

const Repeatable = ({
	className,
	children,
	defaultValue,
	hasRemoveButton = true,
	hasAddButton = true,
	onChangeHandler,
	...formFieldProps
}: Props) => {
	const { id, value, onChange, error, disabled, ...props } = useFormField(
		formFieldProps as any,
		[{ ...defaultValue }],
	);

	useEffect(() => {
		return () => {
			onChange([]);
		};
	}, []);

	useEffect(() => {
		onChangeHandler?.(value);
	}, [value]);

	const itemKeys = useMemo(
		() => (value || []).map(() => `${generateUUID()}-${id}`),
		[value?.length],
	);

	const handleChange = useCallback(
		(itemKey: string, newValue: any) => {
			if (itemKeys.includes(itemKey)) {
				const index = itemKeys.indexOf(itemKey);
				const newVal = [...value.slice(0, index), newValue, ...value.slice(index + 1)];
				onChange(newVal);
			}
		},
		[value, itemKeys, onChange],
	);

	const handleRemove = useCallback(
		(itemKey: string) => {
			const index = itemKeys.indexOf(itemKey);
			return () => {
				onChange([...value.slice(0, index), ...value.slice(index + 1)]);
			};
		},
		[value, itemKeys, onChange],
	);

	const handleAdd = useCallback(
		(e: MouseEvent) => {
			e.preventDefault();
			onChange([...(value || []), { ...defaultValue } || {}]);
		},
		[value, onChange, defaultValue],
	);

	const errMsg = useMemo(() => {
		if (!error) return;

		if (typeof error === 'string') {
			return error;
		}

		if (typeof error === 'object' && Array.isArray(error)) {
			return error.reduce((acc, val) => {
				let errMessage = '';
				Object.entries(val).forEach(([key, msg]) => {
					errMessage += `${msg} \n`;
				});

				return errMessage ? acc + errMessage : acc;
			}, '');
		}
	}, [error]);

	return (
		<div className={mergeClassNames('flex flex-col gap-4', className)} {...props}>
			{(value || []).map((repeatableItemValue: any, index: number) => (
				<React.Fragment key={itemKeys[index]}>
					{repeatableItemValue.label ? (
						<Label
							className="font-bold border-b-2 pb-2"
							label={repeatableItemValue.label}
						/>
					) : null}
					<Form
						values={repeatableItemValue}
						onChange={(f) => handleChange(itemKeys[index], f)}
						manual
						disabled={disabled}
						className="flex items-stretch gap-2"
					>
						<div className="flex-grow">{children}</div>
						{hasRemoveButton ? (
							<>
								<div className="divider divider-horizontal mx-0 " />
								<div>
									<Button
										iconName="trash-o"
										onClick={handleRemove(itemKeys[index])}
										circular
										disabled={disabled}
									/>
								</div>
							</>
						) : null}
					</Form>
				</React.Fragment>
			))}

			{errMsg ? <FormError>{errMsg}</FormError> : null}

			{hasAddButton ? (
				<div className="">
					<Button
						iconName="add"
						onClick={handleAdd}
						small
						className="w-full"
						disabled={disabled}
					/>
				</div>
			) : null}
		</div>
	);
};

export default Repeatable;
