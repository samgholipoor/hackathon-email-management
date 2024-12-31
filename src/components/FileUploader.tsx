import { useCallback, useEffect, useState } from 'react';
import { Button } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';

interface FileUploader {
	title?: string;
	uploader: (e: (e: number) => void) => Promise<number | string>;
	onFinish?: (e: any) => void;
	className?: string;
}

export default function FileUploader({
	title = '',
	uploader = () => Promise.resolve(0),
	onFinish = () => {},
	className,
	...props
}: FileUploader) {
	const [progress, setProgress] = useState<number>(0);
	const [errorMessage, setErrorMessage] = useState(null);

	const doUpload = useCallback(
		() =>
			uploader((uploadedPercent) => {
				setProgress(uploadedPercent);
			})
				.then(onFinish)
				.catch((err) => {
					setErrorMessage(err?.body?.message || 'Unknown Error');
				}),
		[uploader],
	);

	const startJob = useCallback(() => {
		setProgress(0);
		setErrorMessage(null);
		doUpload();
	}, []);

	useEffect(() => {
		startJob();
	}, []);

	return (
		<div
			className={mergeClassNames('flex flex-row items-center gap-2 h-10', className)}
			{...props}
		>
			<span className="font-bold whitespace-nowrap">{title}</span>
			{errorMessage ? (
				<>
					<div className="text-error whitespace-pre grow">{errorMessage}</div>

					<Button iconName="refresh" onClick={startJob}>
						تلاش مجدد
					</Button>
				</>
			) : (
				<>
					<progress
						className="progress progress-primary w-full"
						{...(progress === 0 ? {} : { value: progress * 100, max: 100 })}
					/>
					<span className="text-xs text-opacity-70 font-mono w-16 text-end">
						{`${((progress || 0) * 100).toFixed(2)}%`}
					</span>
				</>
			)}
		</div>
	);
}

const FILE_UPLOADERS_EMPTY_KEY = Symbol('empty');

interface FilesUploader {
	uploaders: FileUploader[];
	onFinish: (e: any) => void;
}

export function FilesUploader({
	uploaders = [],
	onFinish = () => {},
	...props
}: FilesUploader) {
	const [finalResponse, setFinalResponse] = useState<any[]>([]);

	useEffect(() => {
		setFinalResponse(uploaders.map(() => FILE_UPLOADERS_EMPTY_KEY));
	}, [uploaders]);

	useEffect(() => {
		if (
			finalResponse.length &&
			finalResponse.every((resp) => resp !== FILE_UPLOADERS_EMPTY_KEY)
		) {
			onFinish(finalResponse);
		}
	}, [finalResponse]);

	const handleUploaderFinish = useCallback(
		(index: number, data: any) => {
			setFinalResponse((oldFinalResponse) => [
				...oldFinalResponse.slice(0, index),
				data,
				...oldFinalResponse.slice(index + 1),
			]);
		},
		[uploaders, setFinalResponse],
	);

	return (
		<div {...props}>
			{uploaders.map((uploaderObject, index) => (
				<FileUploader
					key={`uploader-${index}`}
					{...uploaderObject}
					onFinish={(data) => handleUploaderFinish(index, data)}
				/>
			))}
		</div>
	);
}
