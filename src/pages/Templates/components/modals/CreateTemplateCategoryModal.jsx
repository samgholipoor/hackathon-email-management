import { useOverlay } from "@/components/Modal";
import CreateTemplateCategory from "../CreateTemplateCategory";

const CreateTemplateCategoryModal = ({ onClose, onFinish }) => {
  const { showToast } = useOverlay();

  const handleSubmit = (formData) => {
    return Promise.resolve(formData);
  };

  const handleSuccess = () => {
    showToast("تولید رمز دوعاملی جدید با موفقیت انجام شد.", "success");
    onFinish();
  };

  return (
    <CreateTemplateCategory
      onSubmit={handleSubmit}
      onClose={onClose}
      onSuccess={handleSuccess}
      // loading={loading}
    />
  );
};

export default CreateTemplateCategoryModal;
