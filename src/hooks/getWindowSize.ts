import { useEffect, useState } from 'react';

const useGetWindowSize = () => {
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	useEffect(() => {
		function resize() {
			setInnerHeight(window.innerHeight);
			setInnerWidth(window.innerWidth);
		}

		if (typeof window !== undefined) {
			window.addEventListener('resize', resize);
		}

		return () => {
			window.removeEventListener('resize', resize);
		};
	}, []);

	return [innerHeight, innerWidth];
};

export { useGetWindowSize };
