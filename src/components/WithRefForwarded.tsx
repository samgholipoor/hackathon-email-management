import { forwardRef } from 'react';
import { getDisplayName } from '@/utils/hoc-utils';

function withRefForwarded<T>(WrappedComponent: any) {
	function refForwarder(props: T, ref: any) {
		return <WrappedComponent forwardedRef={ref} {...props} />;
	}

	refForwarder.displayName = getDisplayName({
		component: WrappedComponent,
		hocName: 'WithRefForwarded',
	});

	refForwarder.WrappedComponent = WrappedComponent;

	return forwardRef(refForwarder);
}

export default withRefForwarded;
