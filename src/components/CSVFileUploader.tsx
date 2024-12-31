import { useCallback, useMemo, useState } from 'react';
import { Button, FormError, NewModal } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import { isCSVFile } from '@/utils/fieldValidators';
import ActionButtons, { actionButton } from './ActionButtons';
import Form, { Label, useFormField } from './form/Form';
import File from './form/File';
import Icon from './Icon';
import CSVFileReader from './CSVFileReader';

interface CSVFileUploaderFieldProps {
	onFinish: (e: any) => void;
}

interface FinishedUplodedFile {
	attachment: string;
	created_at: string;
	file: File;
	id: string;
	original_name: string;
}

interface CSVFileUploaderProps {
	buttonText?: string;
	multiple?: boolean;
	name: string;
	label?: string;
	validator?: ((e: any) => Promise<string | boolean> | string | boolean)[];
}

const CSVFileUploaderField = ({ onFinish }: CSVFileUploaderFieldProps) => {
	const [formData, setFormData] = useState({ file: [] });

	const buttons = useMemo(
		() => [
			actionButton({
				title: 'آپلود',
				type: 'primary',
				// loading: loading,
			}),
			actionButton({
				title: 'انصراف',
				type: 'normal',
				onClick: () => onFinish(undefined),
			}),
		],
		[],
	);

	const formAction = useCallback(async (formattedFormData: any) => {
		const { file } = formattedFormData;
		if (!file) return Promise.reject();

		// const base64ImagesPromises = [file].map(async (fileItem) => {
		// 	const base64 = await toBase64(fileItem);

		// 	return {
		// 		base64,
		// 		original_name: fileItem.name,
		// 	};
		// });

		// const base64Images = await Promise.all(base64ImagesPromises);
		// const promises = base64Images.map((base64Image) => uploadFile(base64Image));
		// return Promise.all(promises);

		return Promise.resolve(file);
	}, []);

	const handleSuccess = (csvFile: any) => {
		onFinish({
			file: csvFile,
		});
	};

	const fileValidator = useMemo(
		() => [
			(file: File) => {
				if (!file) {
					return 'فایلی بارگزاری نشده است';
				}
				return true;
			},
			(file: File) => {
				if (!isCSVFile(file)) {
					return 'نوع فرمت باید .csv یا .xlsx باشد';
				}
				return true;
			},
		],
		[],
	);

	return (
		<Form
			values={formData}
			onChange={setFormData}
			action={formAction}
			onSuccess={handleSuccess}
		>
			<NewModal.Body>
				<div className="pt-6">
					<File name="file" validator={fileValidator} />
				</div>
			</NewModal.Body>
			<NewModal.Footer>
				<ActionButtons buttons={buttons} growButtons />
			</NewModal.Footer>
		</Form>
	);
};

const CSVFileUploader = ({
	buttonText = 'درج فایل',
	multiple = false,
	name,
	label,
	...formFieldProps
}: CSVFileUploaderProps) => {
	const { value, onChange, error, disabled, ...props } = useFormField(
		{
			...formFieldProps,
			name,
		} as any,
		undefined,
	);

	const [uploadedCSVFile, setUploadedCSVFile] = useState<File>();

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleChange = useCallback(
		(uploadedFiles: FinishedUplodedFile | undefined) => {
			setIsModalOpen(false);

			if (!uploadedFiles) return;

			const { file: CSVFile } = uploadedFiles;
			setUploadedCSVFile(CSVFile);
			onChange(CSVFile);
		},
		[value, onchange],
	);

	const valueList = useMemo(() => {
		let ret;
		if (Array.isArray(value)) {
			ret = value;
		} else if (typeof value === 'undefined' || !value) {
			ret = [];
		} else {
			ret = [value];
		}
		return ret;
	}, [value]);

	return (
		<div {...props}>
			<Label label={label} />
			<div className="flex flex-wrap gap-2 mt-2">
				{valueList.length ? (
					valueList?.map((item: File) => (
						<div
							key={item.name}
							className={mergeClassNames(
								'h-24 inline-flex flex-row rounded overflow-hidden relative',
								multiple && 'cursor-grab',
							)}
						>
							<a
								type="button"
								className="w-28 h-auto bg-cover bg-center relative"
								style={{
									backgroundImage: 'url(/assets/icons/image-fallback.svg)',
								}}
								target="_blank"
								rel="noreferrer"
							>
								{item.name ? (
									<span className="w-full h-6 bg-black bg-opacity-20 absolute bottom-0 left-0 text-center text-base-100 truncate px-2">
										{item.name}
									</span>
								) : null}
							</a>
						</div>
					))
				) : (
					<Icon name="image-fallback" className="w-36 h-20" />
				)}
				<Button
					iconName="car-documents"
					onClick={() => setIsModalOpen(true)}
					outlined
					{...(disabled ? { disabled: disabled } : null)}
				>
					{buttonText}
				</Button>
			</div>
			{error ? <FormError className="whitespace-pre">{error}</FormError> : null}

			{uploadedCSVFile ? (
				<div className="max-h-72">
					<CSVFileReader csvFile={uploadedCSVFile} className="my-4" />
				</div>
			) : null}

			<NewModal
				dimmerBackground="darker"
				onClose={() => setIsModalOpen(false)}
				type="stickyfooter"
				isOpen={isModalOpen}
				isAlwaysPresent={false}
			>
				<CSVFileUploaderField onFinish={handleChange} />
			</NewModal>
		</div>
	);
};

export default CSVFileUploader;
