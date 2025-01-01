import Box from "@/components/Box";
import Button from "@/components/Button";
import { Modal } from "@/components/Modal.jsx";
import InApp from "@/layouts/InApp";
import { useState } from "react";
import CreateTemplateCategoryModal from "./components/modals/CreateTemplateCategoryModal";
import CardCategory from "@/components/CardCategory";

const TemplateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = [
    {
      title: "تولد",
      to: "/templates",
      imageSrc: [
        "/assets/images/birthday/1.jpeg",
        "/assets/images/birthday/2.png",
        "/assets/images/birthday/3.png",
        "/assets/images/birthday/4.png",
      ],
    },
    {
      title: "سالگرد",
      to: "/templates",
      imageSrc: [
        "/assets/images/annivarsary/1.jpg",
        "/assets/images/annivarsary/2.jpg",
        "/assets/images/annivarsary/3.png",
        "/assets/images/annivarsary/4.png",
      ],
    },
    {
      title: "ترفیع",
      to: "/templates",
      imageSrc: [
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
      ],
    },
    {
      title: "خوش آمد",
      to: "/templates",
      imageSrc: [
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
      ],
    },
    {
      title: "مناسبت",
      to: "/templates",
      imageSrc: [
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
      ],
    },
    {
      title: "اطلاع رسانی",
      to: "/templates",
      imageSrc: [
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
      ],
    },
    {
      title: "خداحافظی",
      to: "/templates",
      imageSrc: [
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
        "/assets/images/fallback.jpeg",
      ],
    },
  ];

  return (
    <>
      <InApp>
        <Box>
          <div className="flex flex-col gap-8 p-4">
            <div className="flex justify-end">
              <Button
                color="primary"
                icon="add_black_24dp"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                دسته بندی جدید
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {data?.map((item) => {
                return <CardCategory key={item.title} {...item} />;
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
