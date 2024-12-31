import { useOverlay } from "@/components/Modal";
import CreateTemplate from "../CreateTemplate";

const CreateTemplateModal = ({ onClose, onFinish }) => {
  const { showToast } = useOverlay();

  const handleSubmit = (formData) => {
    return Promise.resolve(formData);
  };

  const handleSuccess = () => {
    showToast("تولید رمز دوعاملی جدید با موفقیت انجام شد.", "success");
    onFinish();
  };

  return (
    <CreateTemplate
      onSubmit={handleSubmit}
      onClose={onClose}
      onSuccess={handleSuccess}
      // loading={loading}
    />
  );
};

export default CreateTemplateModal;
