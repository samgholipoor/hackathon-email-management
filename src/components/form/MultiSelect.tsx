import { useCallback, useMemo } from 'react';
import { Switch, CaptionRow } from '@khesht/react';
import Form, { Label, useFormField } from '@/components/form/Form';
import { mergeClassNames } from '@/utils/classname';
import { calcPercentage, getXFromPercent } from '@/utils/percentage';
import { formatToEnglishDigits } from '@/utils/formatNumber';
import Input from './Input';
import FormError from './FormError';

export interface MultiSelectOptionsProps {
	title: string;
	value: any;
}

export interface MultiSelectProps {
	className?: string;
	label: string;
	options: MultiSelectOptionsProps[];
	multiple?: boolean;
	name?: string;
	onChange?: (e: any) => void;
	validator?: ((e: any) => string | boolean)[];
	formatter?: (e: any) => any;
	type?: 'radio' | 'checkbox';
	hasWeight?: boolean;
	maxSelection?: number;
	minSelection?: number;
	hint?: React.ReactNode;
	weightCount: number;
}

const MultiSelect = ({
	className,
	label = '',
	options = [],
	onChange,
	type = 'checkbox',
	multiple = false,
	hasWeight = false,
	maxSelection = Number.POSITIVE_INFINITY,
	minSelection = 0,
	hint,
	weightCount,
	...fieldProps
}: MultiSelectProps) => {
	const {
		id,
		value,
		onChange: onChangeForm,
		error,
		disabled,
		...props
	} = useFormField(fieldProps as any, multiple ? [] : undefined);

	const _calcPercentage = calcPercentage.bind(null, weightCount);
	const _getXFromPercent = getXFromPercent.bind(null, weightCount);

	const formValue = useMemo(() => {
		if (multiple) {
			if (value)
				return hasWeight
					? value?.map((v) => {
							return {
								...v,
								...(v.percentage
									? { percentage: Number(v.percentage) }
									: { percentage: Number(_calcPercentage(v.weight)) }),
							};
					  })
					: value;

			return [];
		} else {
			if (value) return value;
			return null;
		}
	}, [value, hasWeight, multiple]);

	const disabledSelection = useMemo(() => {
		if (multiple && formValue?.length >= maxSelection) {
			return true;
		}

		return false;
	}, [formValue, multiple, maxSelection]);

	const optionsObject = useMemo(
		() =>
			options.map((option) => {
				const { title, value: optionValue } = option;

				let isChecked = false;
				switch (true) {
					case multiple && hasWeight:
						isChecked = formValue?.some(
							(e: { value: string }) => e.value === optionValue,
						);
						break;
					case multiple:
						isChecked = formValue?.includes(optionValue);
						break;
					default:
						isChecked = optionValue === formValue;
						break;
				}

				return {
					title,
					value: optionValue,
					isChecked,
				};
			}),
		[options, formValue, multiple],
	);

	const handleChange = useCallback(
		(optionValue: string) => {
			let newValue = multiple ? [...formValue] : formValue;

			if (multiple && hasWeight) {
				const index = formValue.findIndex((e: { value: string }) => {
					return e.value === optionValue;
				});

				if (index > -1) {
					newValue = [...formValue.slice(0, index), ...formValue.slice(index + 1)];
				} else {
					newValue = [...formValue, { value: optionValue, weight: 0, percentage: 0 }];
				}
			} else if (multiple) {
				const index = formValue.indexOf(optionValue);

				if (index > -1) {
					newValue = [...formValue.slice(0, index), ...formValue.slice(index + 1)];
				} else {
					newValue = [...formValue, optionValue];
				}
			} else if (formValue === optionValue) {
				newValue = undefined;
			} else {
				newValue = optionValue;
			}
			onChange?.(newValue);
			return onChangeForm(newValue);
		},
		[formValue, multiple, onChangeForm],
	);

	const handleWeightChange = (
		optionId: string,
		weightValue: number,
		percentageValue: number,
	) => {
		if (!multiple) return;

		const index = formValue.findIndex((e: { value: string }) => e.value === optionId);
		const newValue = [...formValue];

		if (index === -1) {
			return;
		}

		percentageValue = Number(formatToEnglishDigits(percentageValue));

		if ((weightValue || weightValue === 0) && weightValue !== newValue[index].weight) {
			newValue[index].weight = weightValue;
			newValue[index].percentage = _calcPercentage(weightValue);
			return onChangeForm(newValue);
		}

		if (
			(percentageValue || percentageValue === 0) &&
			percentageValue !== newValue[index].percentage
		) {
			newValue[index].weight = Math.floor(_getXFromPercent(percentageValue));
			newValue[index].percentage = percentageValue;
			return onChangeForm(newValue);
		}
	};

	const percentageAlarm = useMemo(() => {
		if (!multiple) return;

		const sum = formValue.reduce((acc, val) => {
			return acc + (val.percentage || 0);
		}, 0);

		if (sum >= 0 && sum < 100) {
			return (
				<span className="bg-yellow-200 text-yellow-600 p-2 rounded w-fit text-sm">{`${
					100 - sum
				} درصد از میزان رای شما باقی مانده`}</span>
			);
		}
		if (sum < 0 || sum > 100) {
			return (
				<span className="bg-red-100 text-red-600 p-2 rounded w-fit text-sm">
					مجموع درصدها باید بین 0 تا 100 باشد
				</span>
			);
		}
		return (
			<span className="bg-green-100 text-green-600 p-2 rounded w-fit text-sm">
				مجموع درصدها برابر 100 است
			</span>
		);
	}, [formValue, multiple]);

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			{label ? <Label label={label} /> : null}
			{hint ? hint : null}
			{minSelection && minSelection !== 0 ? (
				<CaptionRow className="text-xs !my-0">
					حداقل تعداد انتخاب: {minSelection}
				</CaptionRow>
			) : null}
			{maxSelection && maxSelection !== Number.POSITIVE_INFINITY ? (
				<CaptionRow className="text-xs !mt-0 !mb-2">
					حداکثر تعداد انتخاب: {maxSelection}
				</CaptionRow>
			) : null}
			{hasWeight ? <div className="mb-6 mt-2">{percentageAlarm}</div> : null}
			<div className="flex flex-col justify-center gap-2">
				{optionsObject.map((option) => (
					<div key={option.title} className="flex flex-col md:flex-row gap-2">
						<Switch
							checked={option.isChecked}
							onChange={() => handleChange(option.value)}
							label={option.title}
							type={type}
							disabled={disabled || (!option.isChecked && disabledSelection)}
							className={mergeClassNames('border-2 pl-2 rounded-md w-fit', {
								'border-primary border-opacity-50 bg-primary bg-opacity-10':
									option.isChecked,
							})}
						/>
						{hasWeight && option.isChecked ? (
							<Form
								manual
								values={{
									weight: formValue.find((v: any) => v.value === option.value)?.weight,
									percentage: formValue.find((v: any) => v.value === option.value)
										?.percentage,
								}}
								onChange={({ weight, percentage }) =>
									handleWeightChange(option.value, weight, percentage)
								}
								isForceUpdate
								className="w-full md:w-72"
							>
								<div className="flex justify-between gap-2">
									<Input name="percentage" label="درصد" className="w-2/5" />
									<Input name="weight" label="وزن" type="number" className="w-3/5" />
								</div>
							</Form>
						) : null}
					</div>
				))}
			</div>
			{error ? (
				<div className="whitespace-normal">
					<FormError>{error}</FormError>
				</div>
			) : null}
		</div>
	);
};

export default MultiSelect;
