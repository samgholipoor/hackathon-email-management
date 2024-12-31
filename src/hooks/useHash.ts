import { useLocation } from 'react-router-dom';

export const useHash = (): { allHash: string[]; lastHash: string } => {
	const { hash } = useLocation();
	const allHash = hash.slice(1).split('/');

	return { allHash, lastHash: allHash[allHash.length - 1] || '' };
};
