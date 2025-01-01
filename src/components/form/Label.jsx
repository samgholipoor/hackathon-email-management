import { mergeClassNames } from "@/utils/classname.js";

export const Label = ({ label, htmlFor, className, children }) => (
  <label
    htmlFor={htmlFor}
    className={mergeClassNames(
      className,
      "flex flex-col items-start gap-1 text-gray-700 px-1"
    )}
  >
    {label ? (
      <div className="flex justify-between items-center w-full">
        <span>{label}</span>
      </div>
    ) : null}
    {children}
  </label>
);
