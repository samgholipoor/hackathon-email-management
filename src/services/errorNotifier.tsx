import { useNavigate } from 'react-router-dom';
import { useOverlay } from '@/components/Modal';
import { useEventListener } from '@/hooks/useEventListener';
import { IS_DEV } from '@/constants';

const ERROR_EVENT_NAME = 'apperror';

export const dispatchError = (error: any, scope: string) => {
	window.dispatchEvent(
		new CustomEvent(ERROR_EVENT_NAME, {
			detail: {
				error,
				scope,
			},
		}),
	);
};

export function ErrorNotifierService() {
	const navigate = useNavigate();
	const { showToast } = useOverlay();

	useEventListener(window, ERROR_EVENT_NAME, (event: CustomEvent) => {
		const { error, scope } = event.detail;
		try {
			if (error.status === 0) {
				const err = new Error('Request is canceled');
				err.class = 'cancel';
				throw err;
			}

			if (error.status >= 500 && error.status <= 599) {
				throw error;
			}

			const status = error.status || -1;

			if (status === 401) {
				showToast('توکن شما منقضی شده است', 'error');
				navigate('/auth/login');
				return;
			}

			const message = error?.body?.detail || 'خطایی نامشخصی رخ داده است';
			const prefix = IS_DEV ? `${scope.toUpperCase()} (${status}): ` : '';
			showToast(`${prefix} ${message}`, 'error');
		} catch (_e) {
			if (_e.class === 'cancel') {
				return;
			}

			showToast('خطایی در سامانه رخ داده است', 'error');
		}
	});

	return null;
}
