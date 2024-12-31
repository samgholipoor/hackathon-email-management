import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useLocationStates = () => {
	const location = useLocation();
	return useMemo(() => location.state, [location]);
};

export default useLocationStates;
