import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import IDate from 'idate';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { TextField } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import { joinObjectValues } from '@/utils/object';
import { useFormField } from '@/components/form/Form';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import FormError from './FormError';

interface DatePicker {
	className?: string;
	label?: string;
	placeholder?: string;
	hasTime?: boolean;
	name: string;
	range?: boolean;
	formatter?: (e: any) => any;
	validator?: ((e: any) => string | boolean)[];
	clearable?: boolean;
	formatInputValue?: (x: string) => any;
}

interface Date {
	from?: object;
	to?: object;
	year?: number;
	month?: number;
	day?: number;
}

const localDate = (date: Date) =>
	date.toISOString().replace(/T.+/, '') + 'T09:00:00.000Z';
const currentLang = 'fa';

const convertToJalali = (date) => {
	const [year, month, day] = new IDate(date).jdate;

	return {
		year,
		month: month + 1,
		day,
	};
};

const formatData = (date) => {
	if (date && typeof date === 'object') {
		return {
			start_date: date.from,
			end_date: date.to,
		};
	}
	return date;
};

function DatePicker({
	className,
	label,
	placeholder,
	hasTime = false,
	range,
	formatter,
	clearable = false,
	formatInputValue = (x) => x,
	...formFieldProps
}: DatePicker) {
	const { id, value, onChange, error, disabled, ...props } = useFormField(
		{ ...(formFieldProps as any), formatter: formatter || formatData },
		range ? { to: '', from: '' } : '',
	);

	const refInput = useRef<HTMLInputElement>(null);
	const calendarContainerElement = useRef<HTMLDivElement>(null);
	const shouldPreventToggle = useRef(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [date, setDate] = useState<Date>(value);

	const handleFocus = useCallback(() => {
		if (!shouldPreventToggle.current) setIsCalendarOpen(true);
	}, []);

	const handleBlur = useCallback(
		(e) => {
			e.persist();
			const isInnerElementFocused = calendarContainerElement.current?.contains(
				e.relatedTarget,
			);
			if (shouldPreventToggle.current) {
				shouldPreventToggle.current = false;
				refInput.current?.focus();
			} else if (isInnerElementFocused && e.relatedTarget) {
				e.relatedTarget.focus();
			} else {
				setIsCalendarOpen(false);
			}
		},
		[isCalendarOpen, calendarContainerElement],
	);

	const formatToISODate = (e) => {
		const { year, month, day } = e;
		const d =
			currentLang === 'fa'
				? new IDate(year, month - 1, day + 1).gdate
				: new Date(year, month - 1, day + 1);

		return localDate(d);
	};

	const handleChange = useCallback(
		(e) => {
			if (!e) {
				if (range) {
					onChange({
						to: '',
						from: '',
					});
				} else {
					onChange('');
				}
				setDate('');
				setIsCalendarOpen(false);
				return;
			}

			setDate(e);

			if (range) {
				const { to, from } = e;
				onChange({
					to: formatToISODate(to),
					from: formatToISODate(from),
				});
			} else {
				onChange(formatToISODate(e));
			}
			setIsCalendarOpen(false);
		},
		[onChange],
	);

	useEffect(() => {
		if (!isCalendarOpen) refInput.current?.blur();
	}, [isCalendarOpen]);

	useEffect(() => {
		if (!isCalendarOpen && shouldPreventToggle.current) {
			refInput.current?.focus();
			shouldPreventToggle.current = false;
		}
	}, [shouldPreventToggle, isCalendarOpen]);

	const formattedValue = useMemo(() => {
		if (!date) return '';

		if (typeof date === 'string') {
			const jdateInArray = Object.values(convertToJalali(date));
			return joinObjectValues(jdateInArray.reverse());
		} else if (
			Object.hasOwnProperty.call(date, 'to') &&
			Object.hasOwnProperty.call(date, 'from')
		) {
			if (!date.to && !date.from) {
				return '';
			}

			if (typeof date.from === 'string' && typeof date.to === 'string') {
				const from = Object.values(convertToJalali(date.from));
				const to = Object.values(convertToJalali(date.to));

				return (
					joinObjectValues(from?.reverse()) + ' - ' + joinObjectValues(to?.reverse())
				);
			}

			return joinObjectValues(date.from) + ' - ' + joinObjectValues(date.to);
		}

		return joinObjectValues(date);
	}, [date, value]);

	const calendarValue = useMemo(() => {
		if (!date) return '';
		if (date && typeof date === 'string') {
			return convertToJalali(date);
		}

		if (range) {
			if (!date.to && !date.from) {
				return date;
			}

			if (typeof date.from === 'string' && typeof date.to === 'string') {
				return {
					from: date.from ? convertToJalali(date.from) : '',
					to: date.to ? convertToJalali(date.to) : '',
				};
			}

			return date;
		}

		return date;
	}, [date, value]);

	return (
		<div className={mergeClassNames('w-full relative', className)} {...props}>
			<TextField
				id={id}
				ref={refInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={formatInputValue(formattedValue)}
				onChange={handleChange}
				placeholder={label || placeholder}
				disabled={disabled}
				type="text"
				hasError={!!error}
				labeled={true}
				clearable={clearable}
				readOnly
				{...props}
			/>
			{error ? <FormError>{error}</FormError> : null}
			{isCalendarOpen && (
				<div
					ref={calendarContainerElement}
					role="presentation"
					onMouseDown={() => {
						shouldPreventToggle.current = true;
					}}
					className="absolute top-12 left-0"
				>
					<Calendar
						locale="fa"
						value={calendarValue}
						onChange={handleChange}
						shouldHighlightWeekends
					/>
				</div>
			)}
		</div>
	);
}

export default DatePicker;
