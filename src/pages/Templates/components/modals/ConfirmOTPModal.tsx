import { useConfirmOTPDevice } from '@/services/api';
import { useOverlay } from '@/components/Modal';
import ConfirmOTPForm from '../ConfirmOTPForm';

interface responseData {
	otp: string;
}

interface ConfirmOPTModalProps {
	onCancel: () => void;
	onFinish: () => void;
}

const ConfirmOTPModal = ({ onCancel, onFinish }: ConfirmOPTModalProps) => {
	const { showToast } = useOverlay();

	const { mutate, loading } = useConfirmOTPDevice();

	const handleSubmit = (formData: responseData) => {
		return mutate(formData);
	};

	const handleSuccess = () => {
		showToast('تولید رمز دوعاملی جدید با موفقیت انجام شد.', 'success');
		onFinish();
	};

	return (
		<ConfirmOTPForm
			onSubmit={handleSubmit}
			onCancel={onCancel}
			onSuccess={handleSuccess}
			loading={loading}
		/>
	);
};

export default ConfirmOTPModal;
