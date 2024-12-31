import { ReactNode } from 'react';
import Button from './Button';

export interface DraftConfirmationProps {
	onPublish: () => Promise<any>;
	onDismiss: () => Promise<any>;
	children?: ReactNode | ReactNode[];
}

const DraftConfirmation = ({
	onPublish,
	onDismiss,
	children,
}: DraftConfirmationProps) => {
	return (
		<div className="flex justify-between flex-wrap items-center gap-4 bg-base-200 p-4">
			<div className="flex gap-4">
				<Button onClick={onPublish} icon="done_black_24dp" color="primary">
					تایید
				</Button>
				<Button onClick={onDismiss} icon="close_black_24dp" color="normal">
					رد
				</Button>
			</div>
			<div>{children}</div>
		</div>
	);
};

export default DraftConfirmation;
