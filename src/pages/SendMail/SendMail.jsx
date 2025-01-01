import { useEffect } from "react";
import { useQuery } from "react-query";
import { Formik, Form } from "formik";
import Box from "@/components/Box";
import Editor from "@/components/form/Editor/Editor";
import InApp from "@/layouts/InApp";
import { useState } from "react";
import Input from "@/components/form/Input";
import Radio from "@/components/form/Radio";
import Select from "@/components/form/Select";
import ActionButtons, { actionButton } from "@/components/ActionButtons";
import { useMemo } from "react";
import { getProducts } from "@/services/api/index";

const users = [
  { label: "sama@gmail.com", value: "2" },
  { label: "ali@gmail.com", value: "3" },
  { label: "sam@gmail.com", value: "1" },
  { label: "mohsen@gmail.com", value: "4" },
];

const SendMail = () => {
  const { data: devices, isLoading } = useQuery("devices", getProducts);

  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("/example3-sotoon-birthday.html")
      .then((response) => response.text())
      .then(setValue);
  }, []);

  const buttons = useMemo(
    () => [
      actionButton({
        title: "ارسال",
        type: "primary",
        loading: false,
      }),
    ],
    []
  );

  return (
    <InApp>
      <Box>
        <div className="p-4">
          <Formik
            initialValues={{
              email_type: "all",
              subject: "",
              message: "",
            }}
          >
            {({ values }) => (
              <Form>
                <div className="flex flex-col gap-4">
                  <Radio
                    name="email_type"
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
                  {values.email_type === "group" && (
                    <Select
                      name="groups"
                      label="گروه‌ها"
                      options={users}
                      multiple
                    />
                  )}
                  {values.email_type === "single" && (
                    <Select
                      name="reciepients"
                      label="افراد"
                      options={users}
                      multiple
                    />
                  )}
                  <Input name="subject" label="عنوان پیام" />
                  <Editor value={value} label="متن پیام" />
                  <Select name="cc" label="CC" options={users} multiple />
                  <Select name="bcc" label="BCC" options={users} />
                </div>

                <ActionButtons className="mt-10" buttons={buttons} />
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </InApp>
  );
};

export default SendMail;
