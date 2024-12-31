import { Icon, TitleRow } from '@khesht/react';

interface EmptyFallbackUIProps {
	message?: string;
	iconName?: string;
	state?: 'normal' | 'danger' | 'success' | 'warn';
}

const EmptyFallbackUI = ({
	message = 'داده‌ای برای نمایش وجود ندارد',
	iconName = 'error-circle-o',
	state = 'normal',
}: EmptyFallbackUIProps) => {
	const color = {
		normal: '',
		danger: 'rgb(239 68 68)',
		success: 'rgb(34 197 94)',
		warn: 'rgb(234 179 8)',
	};

	return (
		<div className="flex justify-center items-center gap-1 p-4 text-sm md:text-lg">
			<div className="w-fit flex items-center gap-2">
				<TitleRow
					title={message}
					iconName={iconName}
					titleClassName="!text-gray-700"
					iconColor={color[state]}
				/>
			</div>
		</div>
	);
};

export default EmptyFallbackUI;
