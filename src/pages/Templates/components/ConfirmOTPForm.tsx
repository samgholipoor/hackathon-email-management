import { useCallback, useEffect, useMemo } from 'react';
import { NewModal, CaptionRow, Icon, Toast } from '@khesht/react';
import Form from '@/components/form/Form';
import Input from '@/components/form/Input';
import ActionButtons, { actionButton } from '@/components/ActionButtons';
import { useCreateQRCode } from '@/services/api';
import SuspenseFallback from '@/components/SuspenseFallback';
import { useUserCredentials } from '@/services/auth';
import EmptyFallbackUI from '@/components/EmptyFallbackUI';
import { copyToClipboard } from '@/utils/clipboard';
import { useOverlay } from '@/components/Modal';

interface ConfirmOTPFormProps {
	onCancel: () => void;
	onSuccess: (e: any) => void;
	onSubmit: (e: any) => Promise<any>;
	loading: boolean;
}

const ConfirmOTPForm = ({
	onCancel,
	onSuccess,
	onSubmit,
	loading,
}: ConfirmOTPFormProps) => {
	const { showToast } = useOverlay();
	const { otp_verified } = useUserCredentials();

	const {
		mutate: createQRCode,
		data,
		loading: isCreatingQRCode,
		error,
	} = useCreateQRCode([]);

	useEffect(() => {
		createQRCode();
	}, []);

	const buttons = useMemo(
		() => [
			actionButton({
				title: 'ثبت',
				type: 'primary',
				loading: loading,
			}),
			actionButton({
				title: 'انصراف',
				type: 'normal',
				onClick: onCancel,
			}),
		],
		[onCancel, loading],
	);

	const handleCopyToClipBoard = (token: string) => {
		copyToClipboard(token)
			.then(() => {
				showToast('کد با موفقیت کپی شد!', 'success');
			})
			.catch(() => {
				showToast('مشکلی در کپی کردن رخ داده است!', 'error');
			});
	};

	const renderQRCode = useCallback(() => {
		if (isCreatingQRCode) {
			return <SuspenseFallback message="درحال بارگذاری QR-Code" />;
		}
		if (!isCreatingQRCode && data && !Array.isArray(data)) {
			return (
				<div className="flex flex-col items-center gap-2">
					<img src={`data:image/jpeg;base64,${data.qr}`} className="w-64" />
					<div>
						<div className="border rounded p-2 flex items-center gap-2">
							<Icon
								name="content-copy"
								className="w-6 cursor-pointer"
								onClick={() => handleCopyToClipBoard(data.code)}
							/>
							<p className="text-sm md:text-base">{data.code}</p>
						</div>
					</div>
				</div>
			);
		}
		if (!isCreatingQRCode && error) {
			return <EmptyFallbackUI message="مشکلی در نمایش QR-Code رخ داده است" />;
		}

		return null;
	}, [isCreatingQRCode, error, data]);

	useEffect(() => {
		if (otp_verified) {
			Toast.show({
				text: 'توجه: شما از قبل رمز دوعاملی را فعال کرده‌اید. درصورت تولید رمز دوعاملی جدید، رمز دوعاملی قبلی قابل استفاده نمیباشد.',
				closable: true,
				align: Toast.POSITION.RIGHT,
			});
		}

		Toast.show({
			text: 'توجه: بعد از تولید رمز دوعاملی جدید به صفحه ورود هدایت میشوید، و سپس با وارد کردن رمز دوعاملی وارد حساب کاربری خود خواهید شد.',
			closable: true,
			align: Toast.POSITION.RIGHT,
		});
	}, [otp_verified]);

	return (
		<Form
			action={onSubmit}
			onSuccess={onSuccess}
			className="flex flex-col gap-2 overflow-auto"
		>
			<Toast.Container className="!w-80 md:!w-96 " />
			<NewModal.Header hasDivider>
				<NewModal.TitleBox>
					<NewModal.Title> تولید رمز دوعاملی جدید</NewModal.Title>
				</NewModal.TitleBox>
			</NewModal.Header>

			<NewModal.Body>
				<div className="flex flex-col justify-between">
					<CaptionRow className="text-sm !whitespace-normal">
						ابتدا QR Code را با یکی از اپ های مربوطه (مانند: Google Authenticator) اسکن
						کرده و سپس کد را وارد نمایید.
					</CaptionRow>
					<div className="flex justify-center items-center mb-4">{renderQRCode()}</div>
					<Input name="otp_code" label="رمز یکبار مصرف را وارد کنید" />
				</div>
			</NewModal.Body>
			<NewModal.Footer>
				<ActionButtons buttons={buttons} growButtons />
			</NewModal.Footer>
		</Form>
	);
};

export default ConfirmOTPForm;
