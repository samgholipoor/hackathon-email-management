import { useEffect } from "react";
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
import { sendEmail } from "@/services/api/index";
import { useMutation } from "react-query";

const users = [
  {
    label: "Mohammadhossein Javadi | Javadimohammadhosein@gmail.com",
    value: "Javadimohammadhosein@gmail.com",
  },
  {
    label: "Hamidreza Abolhelm | h.abolhelm@gmail.com",
    value: "h.abolhelm@gmail.com",
  },
  {
    label: "Bahram Ramezani | bahram.ramezani@gmail.com",
    value: "bahram.ramezani@gmail.com",
  },
  {
    label: "Masoud Montazeri | montazeri.masoud@gmail.com",
    value: "montazeri.masoud@gmail.com",
  },
  {
    label: "Abol | taheri.abolfazl@gmail.com",
    value: "taheri.abolfazl@gmail.com",
  },
  {
    label: "Sama | samakalantari@gmail.com",
    value: "samakalantari@gmail.com",
  },
  {
    label: "Ali Amiri | aliamirii.am@gmail.com",
    value: "aliamiriii.am@gmail.com",
  },
  {
    label: "Ali jhnm | alijhnm.sotoon@gmail.com",
    value: "alijhnm.sotoon@gmail.com",
  },
  {
    label: "Sam | samgholipoor00@gmail.com",
    value: "samgholipoor00@gmail.com",
  },
];

const groups = [
  {
    label: "داوران",
    value: "1",
  },
  {
    label: "تیم لیدها",
    value: "2",
  },
  {
    label: "بچه‌های پروداکت",
    value: "3",
  },
  {
    label: "بچه‌های مالی",
    value: "4",
  },
  {
    label: "داوران",
    value: "5",
  },
];

const SendMail = () => {
  const [value, setValue] = useState("");

  const { isLoading, mutate } = useMutation(sendEmail, {
    onSuccess: () => {
      console.log("s");
    },
  });

  useEffect(() => {
    fetch("/example3-sotoon-birthday.html")
      .then((response) => response.text())
      .then(setValue);
  }, []);

  const handleSubmit = (formData) => {
    const { email_type, ...body } = formData || {};

    switch (email_type) {
      case "group":
        return mutate({
          subject: body?.subject,
          body: body?.body,
          // content: "<h1> hello </h1>",
          recipients: users.map((user) => user.value),
        });
      case "single":
        return mutate({
          subject: body?.subject,
          body: body?.body,
          // content: "<h1> hello </h1>",
          recipients: body.reciepients?.map((reciepient) => reciepient.value),
        });
      case "all":
        return Promise.resolve();
      default:
        return Promise.resolve();
    }
  };

  const buttons = useMemo(
    () => [
      actionButton({
        title: "ارسال",
        type: "primary",
        loading: isLoading,
      }),
    ],
    [isLoading]
  );

  return (
    <InApp>
      <Box>
        <div className="p-4">
          <Formik
            initialValues={{
              email_type: "all",
              subject: "",
              body: "",
            }}
            onSubmit={handleSubmit}
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
                      options={groups}
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
                  <Editor name="body" value={value} label="متن پیام" />
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
