import Box from './Box';
import { mergeClassNames } from '@/utils/classname';

interface SuspenseErrorUIProps {
	message?: string;
	className?: string;
}

const SuspenseErrorUI = ({
	message = 'صفحه مورد نظر یافت نشد',
	className,
}: SuspenseErrorUIProps) => {
	return (
		<Box
			className={mergeClassNames(
				className,
				'flex justify-center items-center text-sm gap-4 p-4 md:p-6',
			)}
		>
			{message}
		</Box>
	);
};

export default SuspenseErrorUI;
