import { useEffect } from "react";
import { Formik, Form } from "formik";
import Box from "@/components/Box";
import Editor from "@/components/form/Editor/Editor";
import InApp from "@/layouts/InApp";
import { useState } from "react";
import Input from "@/components/form/Input";
import Radio from "@/components/form/Radio";
import Select from "@/components/form/Select";

const users = [
  { label: "sama@gmail.com", value: "2" },
  { label: "ali@gmail.com", value: "3" },
  { label: "sam@gmail.com", value: "1" },
  { label: "mohsen@gmail.com", value: "4" },
];

const SendMail = () => {
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("/example.html")
      .then((response) => response.text())
      .then(setValue);
  }, []);

  return (
    <InApp>
      <Box>
        <div className="p-4">
          <Formik initialValues={{ type: "all", subject: "", message: "" }}>
            <Form>
              <div className="flex flex-col gap-4">
                <Radio
                  name="typess"
                  label="مخاطب پیام"
                  options={[
                    {
                      title: "همه",
                      value: "all",
                    },
                    {
                      title: "گروهی",
                      value: "group",
                    },
                    {
                      title: "فردی",
                      value: "single",
                    },
                  ]}
                />
                <Input name="subject" label="عنوان پیام" />
                <Editor value={value} label="متن پیام" />
                <Select name="cc" label="CC" options={users} multiple />
                <Select name="bcc" label="BCC" options={users} />
              </div>
            </Form>
          </Formik>
        </div>
      </Box>
    </InApp>
  );
};

export default SendMail;
