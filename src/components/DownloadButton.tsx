import { useCallback, useState } from 'react';
import { Button, ProgressBar } from '@khesht/react';
import { useOverlay } from '@/components/Modal';
import { fetchBlob } from '@/services/api/lib';

interface DownloadButtonProps {
	buttonText?: string;
	filters?: any;
	endpoint: string;
}

const DownloadButton = ({
	buttonText = 'دانلود CSV',
	endpoint,
	filters = {},
}: DownloadButtonProps) => {
	const { showToast } = useOverlay();

	const handleDownloadFile = (blob: Blob) => {
		showToast('فایل مورد نظر با موفقیت دانلود شد.', 'success');
		const URL = window.URL || window.webkitURL;
		const fileURL = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.download = 'file';
		link.href = fileURL;
		link.click();
		URL.revokeObjectURL(fileURL);
	};

	const [loading, setLoading] = useState(false);

	const [progress, setProgress] = useState<'done' | number>('done');
	function onProgress(input: 'done' | number) {
		if (input === 'done') {
			setTimeout(() => {
				setProgress('done');
			}, 200);
			return;
		}
		setProgress(input);
	}

	const getFile = fetchBlob({ url: endpoint }, onProgress);

	const fetchFile = useCallback(async () => {
		setLoading(true);
		getFile({ ...filters })
			.then((blob) => {
				if (blob) {
					return handleDownloadFile(blob);
				}
				const err = new Error();
				err.message = 'مشکلی در دانلود رخ داده است';
				err.name = 'notFound';
				throw err;
			})
			.catch((err: Error) => {
				if (err.name === 'notFound') {
					showToast('مشکلی در دانلود رخ داده است', 'error');
				}
			})
			.finally(() => {
				setLoading(false);
			});
	}, [filters]);

	return (
		<>
			<div style={{ width: '140px' }}>
				{progress === 'done' ? (
					<Button
						onClick={fetchFile}
						inProgress={loading}
						download="csv_file"
						iconName="download-o"
						disabled={loading}
					>
						{buttonText}
					</Button>
				) : (
					<div className="flex flex-col items-center gap-1">
						<span className="text-primary text-xs mb-1">درحال دانلود</span>
						<ProgressBar
							progress={progress}
							color="primary"
							className="outline outline-primary !p-0 !h-1"
						/>
						<span className="text-primary text-sm">{progress}%</span>
					</div>
				)}
			</div>
		</>
	);
};

export default DownloadButton;
