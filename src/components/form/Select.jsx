import { Field } from "formik";
import { mergeClassNames } from "@/utils/classname";
import { Label } from "./Label.jsx";
import { useEffect, useState } from "react";
import SelectOptions from "react-select";

function Select({
  name,
  className,
  label,
  options = [],
  multiple = false,
  loading,
  clearable = false,
  ...props
}) {
  const [newOptions, setNewOptions] = useState(options);

  useEffect(() => {
    setNewOptions(options);
  }, [options]);

  return (
    <div
      className={mergeClassNames(className, "form-control w-full")}
      {...props}
    >
      <Label label={label} />
      <Field name={name}>
        {({ field, form }) => (
          <SelectOptions
            options={newOptions}
            onChange={(val) => {
              form.setFieldValue(name, val);
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "rgb(101, 34, 186)",
                primary25: "rgb(101, 34, 186, 0.25)",
                primary50: "rgb(101, 34, 186, 0.5)",
              },
            })}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderColor: "#f2f2f2",
                boxShadow: "0",
                background: "#f2f2f2",
                padding: "4px 2px",
              }),
              multiValue: (baseStyles) => ({
                ...baseStyles,
                background: "rgba(101, 34, 186, 0.2)",
              }),
            }}
            className="w-full"
            placeholder="انتخاب کنید"
            isLoading={loading}
            isClearable={clearable}
            loadingMessage={() => "درحال بارگذاری..."}
            noOptionsMessage={() => "گزینه‌ای یافت نشد"}
            menuPosition="absolute"
            {...(multiple ? { isMulti: true } : null)}
          />
        )}
      </Field>
    </div>
  );
}

// function Select({ name, label, className, options = [], onChange, ...props }) {
//   return (
//     <div
//       className={mergeClassNames(
//         className,
//         "w-full flex flex-col gap-2 form-control"
//       )}
//       {...props}
//     >
//       {label ? <Label label={label} /> : null}
//       <Field
//         name={name}
//         as="select"
//         multiple
//         className={mergeClassNames(
//           "select bg-base-200 w-full",
//           "active:ring-none transition-all",
//           "hover:border hover:border-gray-400",
//           "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-20"
//         )}
//       >
//         {options.map((option) => (
//           <option value={option.value}>{option.title}</option>
//         ))}
//       </Field>
//     </div>
//   );
// }

export default Select;
