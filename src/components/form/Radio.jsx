import { Field } from "formik";
import { mergeClassNames } from "@/utils/classname";
import { Label } from "./Label";

const Radio = ({
  name,
  className,
  label,
  options = [],
  multiple = false,
  ...props
}) => {
  return (
    <div
      className={mergeClassNames(className, "flex flex-col gap-2")}
      {...props}
    >
      <Label label={label} />
      <div className="flex gap-4">
        {options.map((option) => (
          <div key={option.value} className="flex gap-1">
            <Field
              name={name}
              value={option.value}
              type="radio"
              className="radio radio-primary w-5 h-5"
            />
            <Label label={option.title} htmlFor={option.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
