import { mergeClassNames } from '@/utils/classname';

type DirectionProps = 'left' | 'right' | 'top' | 'bottom';

interface ToolTipProps {
	text: string;
	limitedCount?: number;
	direction?: DirectionProps;
}

const ToolTip = ({ text, limitedCount = 15, direction = 'right' }: ToolTipProps) => {
	if (!text || typeof text !== 'string' || text?.length === 0) {
		return <div>-</div>;
	}

	return (
		<div
			className={mergeClassNames(
				`tooltip-${direction} cursor-help whitespace-pre-wrap text-justify`,
				{
					'tooltip ': text.length > limitedCount,
				},
			)}
			data-tip={text.length > limitedCount ? text : ''}
		>
			{text.length > limitedCount ? text.slice(0, limitedCount) + '...' : text}
		</div>
	);
};

export default ToolTip;
