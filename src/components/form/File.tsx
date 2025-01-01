import {
  ChangeEvent,
  useCallback,
  useMemo,
  useRef,
  DragEvent,
  KeyboardEvent,
} from "react";
import { mergeClassNames } from "@/utils/classname";
import { useFormField, Label } from "./Form";
import FormError from "./FormError";
import { Field } from "formik";

export default function File({
  className,
  label = "",
  multiple = false,
  ...formFieldProps
}) {
  const { id, value, onChange, error, ...props } = useFormField(
    formFieldProps as any,
    undefined
  );

  const inputFileRef = useRef<HTMLInputElement>(null);

  const valueList = useMemo(() => {
    if (multiple) {
      return value ? [...value] : [];
    }
    return value ? [value] : [];
  }, [value]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files) {
        onChange(multiple ? [...files] : files[0]);
      } else {
        onChange(undefined);
      }
    },
    [onChange]
  );

  const handleContainerDrop = useCallback(
    (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const { files } = event.dataTransfer;
      if (files) {
        onChange(multiple ? [...files] : files[0]);
      } else {
        onChange(undefined);
      }
    },
    [onChange, multiple]
  );

  const handleContainerDragOver = useCallback(
    (event: DragEvent<HTMLDivElement>) => event.preventDefault(),
    []
  );
  const handleContainerClick = useCallback(
    () => inputFileRef.current && inputFileRef.current.click(),
    [inputFileRef]
  );
  const handleContainerKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (event.code === "Enter" && inputFileRef.current) {
        inputFileRef.current.click();
      } else if (["Escape", "Backspace", "Delete"].includes(event.code)) {
        onChange(undefined);
      }
    },
    [onChange, multiple, inputFileRef]
  );

  const placeholderContent = valueList.length === 0 && (
    <div className="text-lg">بکشید</div>
  );

  const selectedFileContent = valueList.length > 0 && (
    <div className="text-md text-gray-900">
      {valueList.map((fileObj) => (
        <div key={`${fileObj.name}`}>- {fileObj.name}</div>
      ))}
    </div>
  );

  return (
    <div
      className={mergeClassNames(className, "form-control w-full")}
      {...props}
    >
      <Label label={label} htmlFor={id} />
      <div
        className="border-base-300 dark:border-base-content rounded text-sm focus:border-primary duration-150 transition-color h-52 flex items-center justify-center border-2 border-dashed text-base-content text-opacity-600"
        onDrop={handleContainerDrop}
        onDragOver={handleContainerDragOver}
        onClick={handleContainerClick}
        onKeyDown={handleContainerKeyDown}
        tabIndex={0}
        role="button"
      >
        <Field
          id={id}
          type="file"
          onChange={handleInputChange}
          className="hidden"
          ref={inputFileRef}
          {...(multiple && { multiple: true })}
        />
        {placeholderContent}
        {selectedFileContent}
      </div>
      {error ? <FormError>{error}</FormError> : null}
    </div>
  );
}
