import { useMemo } from "react";
import ActionButtons, { actionButton } from "@/components/ActionButtons";

const ConfirmOTPForm = ({ onSubmit, onClose, onSuccess, loading }) => {
  const buttons = useMemo(
    () => [
      actionButton({
        title: "ایجاد",
        type: "primary",
        loading: loading,
      }),
      actionButton({
        title: "بستن",
        type: "normal",
        onClick: onClose,
      }),
    ],
    [onClose, loading]
  );

  return (
    // <Form
    //   action={onSubmit}
    //   onSuccess={onSuccess}
    //   className="flex flex-col gap-2 overflow-auto"
    // >
    <ActionButtons buttons={buttons} growButtons />
    // </Form>
  );
};

export default ConfirmOTPForm;
