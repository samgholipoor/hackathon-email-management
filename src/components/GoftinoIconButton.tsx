import { goftino } from '@/services/goftino';
import Icon from './Icon';

const GoftinoIconButton = () => {
	return (
		<div
			className="fixed bottom-10 md:bottom-12 left-8 z-10 w-14 h-14 bg-primary rounded-2xl cursor-pointer shadow-sm shadow-gray-50"
			onClick={() => {
				goftino.toggle();
			}}
		>
			<div className="flex justify-center items-center w-full h-full">
				<Icon name="chat-bot-logo" className="w-8 h-8" />
			</div>
		</div>
	);
};

export default GoftinoIconButton;
