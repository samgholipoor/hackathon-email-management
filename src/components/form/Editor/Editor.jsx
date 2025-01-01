import { Field } from "formik";
import { useEffect, useRef, useState } from "react";
import { mergeClassNames } from "@/utils/classname";
import { Label } from "../Label.jsx";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import SourceEditor from "./SourceEditor.jsx";

function Editor({
  name,
  value,
  label,
  className,
  formatter,
  options,
  loading = false,
  loadingMessage = "درحال راه‌اندازی...",
  ...props
}) {
  const [editorKey, setEditorKey] = useState(1);
  const isComponentMount = useRef(false);

  useEffect(() => {
    if (isComponentMount.current && value) {
      setEditorKey((p) => p + 1);
    }
  }, [options, value]);

  useEffect(() => {
    if (!isComponentMount.current) {
      isComponentMount.current = true;
      return;
    }
  }, []);

  const prevData = useRef("");

  return (
    <div
      className={mergeClassNames("flex flex-col relative", className)}
      {...props}
    >
      {label ? <Label className="mb-2" label={label} /> : null}
      <Field name={name} {...props}>
        {({ field, form }) => (
          <CKEditor
            key={editorKey}
            editor={SourceEditor}
            data=""
            onChange={(_, editor) => {
              const data = editor.getData();

              if (prevData.current !== data) {
                prevData.current = data;
                form.setFieldValue(name, data);
              }
            }}
            onReady={(editor) => {
              if (!editor?.editing?.view?.document) return;
              editor.execute("htmlEmbed", value);
              const documentView = editor.editing.view.document;

              documentView.on("clipboardInput", (evt, data) => {
                try {
                  const rtf = data?.dataTransfer?.getData?.("text/html");
                  if (!rtf) return;

                  evt.stop();
                  const content = rtf
                    .replace(/(background-color)(.*?);/g, "")
                    .replace(/(caret-color)(.*?);/g, "")
                    .replace(/(font-family)(.*?);/g, "")
                    .replace(/(color)(.*?);/g, "");
                  const viewFragment = editor.data.processor.toView(content);
                  const modelFragment = editor.data.toModel(viewFragment);
                  editor.model.insertContent(
                    modelFragment,
                    editor.model.document.selection
                  );
                } catch (e) {
                  console.error("err", e);
                }
              });
            }}
          />
        )}
      </Field>
    </div>
  );
}

export default Editor;
