import { Field } from "formik";
import { mergeClassNames } from "@/utils/classname.js";
import { useState } from "react";

const File = ({ name, label, className, onChange, ...props }) => {
  const [selectedFile, setSelectedFile] = useState();

  return (
    <div className={mergeClassNames(className, "w-full flex flex-col gap-2")}>
      <label
        htmlFor={label}
        className="flex items-center gap-4 bg-base-200 rounded-md w-full max-w-xs cursor-pointer text-gray-700 overflow-hidden"
      >
        <span className="py-3 px-4 bg-gray-700 text-white">{label}</span>
        <div class="w-40 text-sm">
          <p class="truncate">
            {selectedFile ? selectedFile.name : "فایلی انتخاب نشده"}
          </p>
        </div>
      </label>

      <Field name={name} {...props}>
        {({ field, form }) => (
          <input
            id={label}
            type="file"
            style={{ display: "none" }} // Hide default file input
            className="file-input file-input-bordered w-full max-w-xs"
            onChange={(event) => {
              const file = event.currentTarget.files[0];
              console.log(file);

              setSelectedFile(file);
              onChange?.(file);
              form.setFieldValue(name, file);
            }}
          />
        )}
      </Field>
    </div>
  );
};

export default File;
