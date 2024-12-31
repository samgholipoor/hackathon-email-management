import { useEffect } from 'react';

export const useEventListener = (
	element: HTMLElement | Window,
	...eventListenerArgs: any
) => {
	useEffect(() => {
		if (element) {
			element.addEventListener(...eventListenerArgs);
		}
		return () => {
			if (element) {
				element.removeEventListener(...eventListenerArgs);
			}
		};
	}, []);
};
