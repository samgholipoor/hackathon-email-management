import { useCallback, useMemo, useState } from 'react';
import { Button, NewModal, CaptionRow, Icon as IconKhesht } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import { typeOf } from '@/utils/typeOf';
import { useUploadFile } from '@/services/api';
import { toBase64 } from '@/utils/toBase64';
import { useOpenModal } from '@/hooks/useOpenModal';
import ActionButtons, { actionButton } from './ActionButtons';
import Form, { Label, useFormField } from './form/Form';
import File from './form/File';
import Icon from './Icon';
import FormError from './form/FormError';

interface GalleryFileUpload {
	onFinish: (e: any) => void;
	onCancel: () => void;
	multiple?: boolean;
	returnRawFile?: boolean;
}

const getExt = (fileObject: File) => {
	const fileName = fileObject?.name || fileObject?.original_name;
	if (!fileName) {
		return;
	}
	return fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
};

const isImg = (fileObject: File) =>
	['jpg', 'png', 'gif', 'bmp', 'svg', 'jpeg'].includes(getExt(fileObject));

const isFileEligible = (fileObject: File) =>
	['jpg', 'png', 'gif', 'bmp', 'svg', 'jpeg', 'pdf', 'xlsx'].includes(getExt(fileObject));

const GalleryFileUpload = ({
	onFinish,
	onCancel,
	multiple,
	returnRawFile = false,
}: GalleryFileUpload) => {
	const [formData, setFormData] = useState({ file: [] });
	const { mutate: uploadFile, loading } = useUploadFile();

	const buttons = useMemo(
		() => [
			actionButton({
				title: 'آپلود',
				type: 'primary',
				iconName: 'cloud-upload-o',
				loading: loading,
			}),
			actionButton({
				title: 'انصراف',
				type: 'normal',
				iconName: 'close',
				onClick: onCancel,
			}),
		],
		[loading, onCancel],
	);

	const formAction = useCallback(
		async (formattedFormData: any) => {
			const { file } = formattedFormData;
			if (!file || (multiple && !file.length)) return Promise.reject();

			const fileInArray = [...(multiple ? [...file] : [file])];

			if (returnRawFile) {
				return Promise.resolve(fileInArray);
			}

			const base64ImagesPromises = fileInArray.map(async (fileItem) => {
				const base64 = await toBase64(fileItem);

				return {
					base64,
					original_name: fileItem.name,
				};
			});

			const base64Images = await Promise.all(base64ImagesPromises);
			const promises = base64Images.map((base64Image) => uploadFile(base64Image));
			return Promise.all(promises);
		},
		[multiple, returnRawFile],
	);

	const handleSuccess = (resp: any) => {
		onFinish(resp);
	};

	const fileValidator = useMemo(
		() => [
			(file: File) => {
				if (!file || (multiple && !file.length)) {
					return 'فایلی بارگزاری نشده است';
				}
				return true;
			},
			(file: any) => {
				const filesList = multiple ? [...file] : [file];

				if (!filesList.every(isFileEligible)) {
					return 'نوع فرمت فایل بارگزاری شده درست نمی باشد';
				}
				return true;
			},
		],
		[multiple],
	);

	return (
		<Form
			values={formData}
			onChange={setFormData}
			action={formAction}
			onSuccess={handleSuccess}
		>
			<NewModal.Header hasDivider>
				<NewModal.TitleBox>
					<NewModal.Title>بارگذاری فایل</NewModal.Title>
				</NewModal.TitleBox>
			</NewModal.Header>
			<NewModal.Body>
				<div className="pt-4">
					<File name="file" multiple={multiple} validator={fileValidator} />
				</div>
			</NewModal.Body>
			<NewModal.Footer>
				<ActionButtons buttons={buttons} growButtons />
			</NewModal.Footer>
		</Form>
	);
};

interface GalleryFormField {
	buttonText?: string;
	multiple?: boolean;
	name: string;
	label?: string;
	validator?: ((e: any) => string | boolean)[];
	returnRawFile?: boolean;
}

const mapGalleryObjToToken = (x: any) => {
	if (typeOf(x) === 'object') {
		return (x || {}).id || undefined;
	}
	return x;
};

const mediaFormFormatter = (x: any) => {
	if (Array.isArray(x)) {
		return x.map(mapGalleryObjToToken);
	}
	if (x) {
		return mapGalleryObjToToken(x);
	}
	return undefined;
};

const GalleryFormField = ({
	buttonText = 'درج تصویر',
	multiple = false,
	name,
	label,
	returnRawFile = false,
	...formFieldProps
}: GalleryFormField) => {
	const { isModalOpen, openModal, closeModal } = useOpenModal();

	const { value, onChange, error, disabled, ...props } = useFormField(
		{
			...formFieldProps,
			name,
			formatter: mediaFormFormatter,
		} as any,
		undefined,
	);

	const handleChange = useCallback(
		(uploadedFiles: File[] | undefined) => {
			closeModal();
			if (!uploadedFiles || uploadedFiles.length === 0) return;
			let newValue = [];
			if (multiple) {
				newValue = [...(value || []), ...(uploadedFiles as any[])];
			} else {
				newValue = uploadedFiles?.[0] || (uploadedFiles as any);
			}

			if (newValue || newValue.length > 0) {
				onChange(newValue);
			} else {
				onChange(undefined);
			}
		},
		[multiple, value, onchange],
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

	const handleFileDelete = (file: any) => {
		const newValuesList = valueList.filter((f) => f.id !== file.id);

		if (newValuesList.length > 0) {
			onChange(newValuesList);
		} else {
			onChange(undefined);
		}
	};

	return (
		<div {...props}>
			<Label label={label} />
			<div className="flex flex-wrap gap-2 mt-2">
				{valueList.length > 0 ? (
					valueList?.map((file) => {
						const bgUrl = isImg(file) ? file.attachment : '/assets/images/file-icon.png';

						return (
							<div
								key={file.id}
								className={mergeClassNames(
									'inline-flex flex-row rounded overflow-hidden relative group w-28',
									'flex flex-col',
									multiple && 'cursor-grab',
								)}
							>
								<a
									type="button"
									className="h-28 bg-cover bg-center"
									style={{
										backgroundImage: `url("${bgUrl}")`,
									}}
									target="_blank"
									href={file.attachment}
									rel="noreferrer"
								/>
								<div
									className={mergeClassNames(
										'absolute bottom-0 right-0 w-full',
										'bg-black bg-opacity-55 !text-white transition-all',
										'flex justify-between items-center gap-1 p-1',
									)}
								>
									<CaptionRow className="text-sm !truncate !my-0 !text-white">
										{file.original_name || file.name}
									</CaptionRow>

									<div className="flex items-center flex-row-reverse gap-1">
										<IconKhesht
											name="trash-f"
											className="cursor-pointer text-error"
											onClick={handleFileDelete.bind(null, file)}
										/>

										<a
											href={file.attachment}
											download={file.name}
											rel="noreferrer"
											target="_blank"
										>
											<IconKhesht name="download-o" className="cursor-pointer" />
										</a>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<Icon name="image-fallback" className="w-36 h-20" />
				)}
				<Button
					iconName="car-documents"
					onClick={openModal}
					outlined
					{...(disabled ? { disabled: disabled } : null)}
				>
					{buttonText}
				</Button>
			</div>
			{error ? <FormError>{JSON.stringify(error)}</FormError> : null}

			<NewModal
				isOpen={isModalOpen}
				onClose={closeModal}
				type="stickyfooter"
				dimmerBackground="darker"
				isAlwaysPresent={false}
			>
				<GalleryFileUpload
					onFinish={handleChange}
					onCancel={closeModal}
					multiple={multiple}
					returnRawFile={returnRawFile}
				/>
			</NewModal>
		</div>
	);
};

export default GalleryFormField;
