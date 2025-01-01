import { useMemo } from "react";
import { Formik, Form, Field } from "formik";
import ActionButtons, { actionButton } from "@/components/ActionButtons";
import Input from "@/components/form/Input";

const CreateTemplateCategory = ({ onSubmit, onClose, onSuccess, loading }) => {
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
    <Formik>
      <Form>
        <div className="flex flex-col gap-4">
          <Input name="title" label="نام" />
          <Input name="description" label="توضیحات" isMultiLine />
          <Field name="file" />
        </div>
        <ActionButtons buttons={buttons} growButtons />
      </Form>
    </Formik>
  );
};

export default CreateTemplateCategory;
