import { ReactNode } from 'react';
import { mergeClassNames } from '@/utils/classname';

interface FormErrorProps {
	children: string | ReactNode;
	className?: string;
}

const FormError = ({ children, className }: FormErrorProps) => {
	return (
		<p
			className={mergeClassNames(
				'text-sm bg-red-100 text-red-500 p-2 my-2 rounded-md',
				className,
			)}
		>
			{children}
		</p>
	);
};

export default FormError;
