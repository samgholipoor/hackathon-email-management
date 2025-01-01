import Box from "@/components/Box";
import Button from "@/components/Button";
import Card from "@/components/Card";
import { Modal } from "@/components/Modal.jsx";
import InApp from "@/layouts/InApp";
import { useState } from "react";
import CreateTemplateCategoryModal from "./components/modals/CreateTemplateCategoryModal";
import { useLocation } from "react-router-dom";
import Icon from "@/components/Icon.jsx";

const TemplateCategory = () => {
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const data = [
    {
      title: "تولد ۱",
      to: "/send-email",
      src: "/example3-sotoon-birthday.html",
    },
    {
      title: "تولد ۲",
      to: "/send-email",
      src: "/example2.html",
    },
    {
      title: "تولد ۳",
      to: "/send-email",
      src: "/example5.html",
    },
    {
      title: "تولد ۴",
      to: "/send-email",
      src: "/example4.html",
    },
  ];

  return (
    <>
      <InApp>
        <Box>
          <div className="flex flex-col gap-8 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 text-lg font-bold text-gray-600">
                {location.state ? (
                  <Icon name="category_24dp" className="w-8 text-primary" />
                ) : null}
                {location.state ? `دسته ${location.state}` : null}
              </div>

              <Button
                color="primary"
                icon="add_black_24dp"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                قالب جدید
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {data?.map((item) => {
                return <Card key={item.title} {...item} />;
              })}
            </div>
          </div>
        </Box>
      </InApp>

      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)}>
          <CreateTemplateCategoryModal onClose={() => setIsOpen(false)} />
        </Modal>
      ) : null}
    </>
  );
};

export default TemplateCategory;
