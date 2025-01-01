import { Field } from "formik";
import { Label } from "@/components/form/Label.jsx";
import { mergeClassNames } from "@/utils/classname.js";

const Input = ({
  label,
  className,
  isMultiLine = false,
  onChange,
  ...props
}) => {
  const tag = isMultiLine ? "textarea" : "input";

  return (
    <div className={mergeClassNames(className, "w-full flex flex-col gap-2")}>
      {label ? <Label label={label} /> : null}
      <Field
        id={label}
        as={tag}
        onChange={onChange}
        className={mergeClassNames(
          tag,
          "w-full bg-base-200 active:ring-none transition-all",
          "hover:border hover:border-gray-400",
          "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20"
        )}
        {...props}
      />
    </div>
  );
};

export default Input;
