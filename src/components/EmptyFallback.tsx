import Icon from './Icon';

interface EmptyFallbackProps {
	message?: string;
	iconName?: string;
}

const EmptyFallback = ({
	message = 'داده‌ای برای نمایش وجود ندارد',
	iconName = 'error_outline_black_24dp',
}: EmptyFallbackProps) => {
	return (
		<div className="flex justify-center items-center gap-1 px-4 text-sm md:text-lg p-4 md:p-6">
			<div className="w-fit flex items-center gap-2">
				<span className="text-sm">{message}</span>
				<Icon name={iconName} className="w-5" />
			</div>
		</div>
	);
};

export default EmptyFallback;
