import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import IDate from 'idate';
import { Icon } from '@khesht/react';
import { TextField } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import { useFormField } from '@/components/form/Form';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { monthNames } from '@/utils/calendar';
import FormError from './FormError';

interface MonthPickerProps {
	className?: string;
	placeholder?: string;
	name: string;
	formatter?: (e: any) => any;
	validator?: ((e: any) => string | boolean)[];
	formatInputValue?: (x: string) => any;
	clearable?: boolean;
}

function MonthPicker({
	className,
	placeholder,
	formatter,
	formatInputValue = (x) => x,
	clearable = true,
	...formFieldProps
}: MonthPickerProps) {
	const { id, value, onChange, error, disabled, ...props } = useFormField(
		{ ...(formFieldProps as any), formatter: formatter },
		'',
	);

	const refInput = useRef<HTMLInputElement>(null);
	const calendarContainerElement = useRef<HTMLDivElement>(null);
	const shouldPreventToggle = useRef(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [date, setDate] = useState<string | null>(value);

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

	useEffect(() => {
		if (!isCalendarOpen) refInput.current?.blur();
	}, [isCalendarOpen]);

	useEffect(() => {
		if (!isCalendarOpen && shouldPreventToggle.current) {
			refInput.current?.focus();
			shouldPreventToggle.current = false;
		}
	}, [shouldPreventToggle, isCalendarOpen]);

	const selectedDate = useMemo(() => {
		return date ? new IDate(date)?.jdate : [];
	}, [date]);

	const formattedValue = useMemo(() => {
		const [year, month] = selectedDate;
		if (!year && !(month || month === 0)) return '';
		return `${year} ${monthNames[month]}`;
	}, [selectedDate]);

	const [year] = new IDate().jdate;
	const [selectedYear, setSelectedYear] = useState<number>(selectedDate[0] || year);

	const handleMonthClick = (monthName: string) => {
		const index = monthNames.indexOf(monthName);
		const val = new IDate(selectedYear, index, 2).toISOString()?.split('T')?.[0];
		onChange(val);
		setDate(val);
		setIsCalendarOpen(false);
	};

	const years = useMemo(() => {
		const yearsList = [];
		const rangeCount = 50;
		for (let index = -rangeCount; index < rangeCount; index++) {
			const element = year + index;
			yearsList.push(element);
		}
		return yearsList;
	}, []);

	const handleIncreament = () => {
		setSelectedYear((prev) => {
			const index = years.indexOf(prev);
			const currentYear = years[index + 1];
			if (index === -1 || !currentYear) {
				return prev;
			} else {
				return currentYear;
			}
		});
	};

	const handleDecreament = () => {
		setSelectedYear((prev) => {
			const index = years.indexOf(prev);
			const currentYear = years[index - 1];
			if (index === -1 || !currentYear) {
				return prev;
			} else {
				return currentYear;
			}
		});
	};

	const handleClearInput = (val, e) => {
		if (val === '') {
			onChange('');
			setDate('');
			setIsCalendarOpen(false);
		}
	};

	const [calendarContainerWidth, setCalendarContainerWidth] = useState<number>(300);
	useEffect(() => {
		if (isCalendarOpen) {
			const containerWidth =
				calendarContainerElement.current?.getBoundingClientRect()?.width || 300;
			if (containerWidth) {
				setCalendarContainerWidth(containerWidth);
			}
		}
	}, [isCalendarOpen]);

	return (
		<div className={mergeClassNames('w-full relative', className)} {...props}>
			<TextField
				id={id}
				ref={refInput}
				onFocus={handleFocus}
				onBlur={handleBlur}
				value={formatInputValue(formattedValue)}
				placeholder={placeholder}
				disabled={disabled}
				type="text"
				hasError={!!error}
				labeled={true}
				onChange={handleClearInput}
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
					className="absolute top-12 left-0 w-full p-2 border bg-white rounded"
					style={{ zIndex: '999' }}
				>
					<div className="flex flex-col gap-4 pt-2">
						<div className="w-full flex flex-col items-center gap-4">
							<div className="flex items-center gap-2">
								<Icon name="keyboard-arrow-right" size="xl" onClick={handleIncreament} />
								<span className="text-xl">{selectedYear}</span>
								<Icon name="keyboard-arrow-left" size="xl" onClick={handleDecreament} />
							</div>
						</div>
						<div>
							<div
								className={mergeClassNames('grid gap-2', {
									'grid-cols-2': calendarContainerWidth < 280,
									'grid-cols-3': calendarContainerWidth >= 280,
								})}
							>
								{monthNames.map((monthName, index) => (
									<span
										key={monthName}
										className={mergeClassNames(
											'cursor-pointer border text-center p-2 rounded shadow-sm hover:bg-base-200 transition-all',
											{ 'bg-gray-200': index === selectedDate[1] },
										)}
										onClick={handleMonthClick.bind(null, monthName)}
									>
										{monthName}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default MonthPicker;
