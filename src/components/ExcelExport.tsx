import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Button } from '@khesht/react';

interface ExcelExportProps {
	data: object;
	fileName: string;
	textButton: string;
	className?: string;
}

const ExcelExport = ({ data, fileName, textButton, className }: ExcelExportProps) => {
	const exportToExcel = () => {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(data);
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

		const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
		const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
		saveAs(blob, `${fileName}`);
	};

	return (
		<div className={className}>
			<Button onClick={exportToExcel} iconName="download-o" small>
				{textButton}
			</Button>
		</div>
	);
};

export default ExcelExport;
