import { useCallback } from 'react';
import useReadCSVFile from '@/hooks/useReadCSVFile';
import { mergeClassNames } from '@/utils/classname';
import { Spinner } from './Spinner';
import Table from './Table';
import Icon from './Icon';

interface CSVFileReaderProps {
	csvFile: File;
	className?: string;
}

const CSVFileReader = ({ csvFile, className }: CSVFileReaderProps) => {
	const { header, body, loading } = useReadCSVFile(csvFile);

	const render = useCallback(() => {
		if (loading) {
			return (
				<div className="w-full h-full flex justify-center items-center gap-4">
					<span className="text-sm text-gray-700">درحال بارگذاری فایل</span>
					<Spinner className="w-6 h-6" />
				</div>
			);
		}

		if (!loading && header && header?.length > 0 && body) {
			return (
				<Table>
					<Table.Row type="header">
						{header?.map((title) => (
							<Table.Field key={title}>{title}</Table.Field>
						))}
					</Table.Row>
					{body?.map((rowItem, index) => {
						const fields = rowItem.map((item, i) => (
							<Table.Field key={i}>{item}</Table.Field>
						));

						return <Table.Row key={index}>{fields}</Table.Row>;
					})}
				</Table>
			);
		}

		return (
			<div className="flex justify-center items-center gap-1 px-4 text-sm md:text-lg">
				<div className="w-fit flex items-center gap-2">
					<span>داده‌ای برای نمایش وجود ندارد</span>
					<Icon name="error_outline_black_24dp" className="w-6 md:w-8" />
				</div>
			</div>
		);
	}, [loading, header, body]);

	return (
		<div className={mergeClassNames(className, 'bg-base-200 bg-opacity-50 p-4 rounded')}>
			{render()}
		</div>
	);
};

export default CSVFileReader;
