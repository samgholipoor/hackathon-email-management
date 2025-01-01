import { Field } from "formik";
import { mergeClassNames } from "@/utils/classname";
import { Label } from "./Label.jsx";

function Select({ name, label, className, options = [], onChange, ...props }) {
  return (
    <div
      className={mergeClassNames(
        className,
        "w-full flex flex-col gap-2 form-control"
      )}
      {...props}
    >
      {label ? <Label label={label} /> : null}
      <Field
        name={name}
        as="select"
        className={mergeClassNames(
          "select bg-base-200 w-full",
          "active:ring-none transition-all",
          "hover:border hover:border-gray-400",
          "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20"
        )}
      >
        {options.map((option) => (
          <option value={option.value}>{option.title}</option>
        ))}
      </Field>
    </div>
  );
}

export default Select;
