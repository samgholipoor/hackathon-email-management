import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { mergeClassNames } from '@/utils/classname';
import { generateUUID } from '@/utils/uuid';

const context = createContext();

export const useLoading = (): [l: boolean, s: (e: boolean) => void] => {
	const clientId = useMemo(() => generateUUID(), []);
	const [loadingers, setLoadingers] = useContext(context);
	const loading = useMemo(() => loadingers.length > 0, [loadingers]);

	const setLoading = useCallback(
		(newState: boolean) => {
			setLoadingers((oldLoadingers) => {
				const loadingerIndex = oldLoadingers.indexOf(clientId);
				let newLoadingers = [...oldLoadingers];
				if (newState && loadingerIndex === -1) {
					newLoadingers = [...newLoadingers, clientId];
				}

				if (!newState && loadingerIndex > -1) {
					newLoadingers = [
						...newLoadingers.slice(0, loadingerIndex),
						...newLoadingers.slice(loadingerIndex + 1),
					];
				}
				return newLoadingers;
			});
		},
		[loadingers],
	);

	useEffect(() => () => setLoading(false), []);
	return [loading, setLoading];
};

interface Spinner {
	className?: string;
}

export function Spinner({ className, ...props }: Spinner) {
	return (
		<div
			className={mergeClassNames(
				'rounded-full border-4 border-white border-t-primary border-l-gray-50 border-r-gray-50 border-b-gray-50 cursor-wait animate-spin',
				className,
			)}
			{...props}
		/>
	);
}

interface LoadingProvider {
	children: JSX.Element | JSX.Element[];
}

export function LoadingProvider({ children }: LoadingProvider) {
	const loadingers = useState([]);

	return (
		<context.Provider value={loadingers}>
			{children}
			{loadingers[0].length > 0 && (
				<div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-30 z-20">
					<Spinner className="w-8 h-8" />
				</div>
			)}
		</context.Provider>
	);
}
