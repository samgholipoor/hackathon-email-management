import {
	useEffect,
	useMemo,
	Children,
	isValidElement,
	useState,
	ReactNode,
	useRef,
	useCallback,
} from 'react';
import Form from '@/components/form/Form';
import useDebounce from '@/hooks/useDebounce';
import { useQuery, useUpdateQuery } from '@/utils/url';
import Select from './form/Select';
import Input from './form/Input';
import DatePicker from './form/DatePicker';
import MonthPicker from './form/MonthPicker';
import InputNumber from './form/InputNumber';

interface TableSearchFields {
	children?: ReactNode | ReactNode[];
	defaultValues?: object;
	handleFilterChange: (e: object) => void;
	className?: string;
	placeholder?: string;
	label?: string;
	formatter?: (e: any) => any;
	isPreserve: boolean;
	dependenies?: { [k in string]: string[] };
}

const TableSearchFields = ({
	children,
	defaultValues,
	handleFilterChange,
	className,
	placeholder = 'جستوجو',
	formatter = (x) => x,
	isPreserve = true,
	dependenies,
}: TableSearchFields) => {
	const updateQuery = useUpdateQuery();
	const FormFields = useRef([Input, Select, DatePicker, MonthPicker, InputNumber]);

	const [values, setValues] = useState<object>({
		...(defaultValues || {}),
		...(isPreserve ? useQuery() : null),
	});

	const debouncedSearchTerm = useDebounce<object>(values, 400);
	const isMount = useRef(false);

	const checkNotBeEmptyField = (obj) => {
		if (!obj && Object.keys(obj).length) {
			return {};
		}

		const newObj = {};

		Object.entries(obj).forEach(([key, value]) => {
			if (Array.isArray(value) && value.length > 0) {
				newObj[key] = value;
			} else if ((typeof value === 'string' || typeof value === 'number') && value) {
				newObj[key] = value;
			}
		});

		return newObj;
	};

	useEffect(() => {
		const keys = Object.keys(debouncedSearchTerm);
		isMount.current = true;

		if (keys.length && isMount.current) {
			handleFilterChange(checkNotBeEmptyField(formatter(debouncedSearchTerm)));
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		() => {
			isMount.current = false;
		};
	}, [debouncedSearchTerm]);

	const handleChange = useCallback(
		(formData: any) => {
			setValues(formData);
			if (isPreserve) {
				updateQuery(formData);
			}
		},
		[updateQuery, isPreserve],
	);

	const isFieldIncludes = (Field: any) =>
		FormFields.current.some((FormField) => FormField === Field);

	const bodyChildren = useMemo(
		() =>
			Children.toArray(children).filter((child: ReactNode) => {
				if (child && isValidElement(child)) {
					return isFieldIncludes(child.type);
				}
			}),
		[children],
	);

	return (
		<Form
			values={values}
			onChange={handleChange}
			className={className}
			dependenies={dependenies}
		>
			{bodyChildren.length ? (
				bodyChildren
			) : (
				<Input placeholder={placeholder} name="query" className="w-56" />
			)}
		</Form>
	);
};

export default TableSearchFields;
