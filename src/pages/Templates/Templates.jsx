import Box from "@/components/Box";
import Button from "@/components/Button";
import Card from "@/components/Card";
import InApp from "@/layouts/InApp";

const Templates = () => {
  const data = [
    {
      title: "سالگرد",
      imageSrc:
        "https://www.maildesigner365.com/wp-content/uploads/sites/4/2022/02/company-milestone-designidee.png",
    },
    {
      title: "تولد",
      imageSrc:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_oRpPC9EoN65cQ8gfMzKZgBTphgUWCwQPtA&s",
    },
    {
      title: "ترفیع",
      imageSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "خوش آمد",
      imageSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "مناسبت",
      imageSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "اطلاع رسانی",
      imageSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
    {
      title: "خداحافظی",
      imageSrc:
        "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    },
  ];

  return (
    <InApp>
      <Box>
        <div className="flex flex-col gap-8 p-4">
          <div className="flex justify-end">
            <Button color="primary" icon="add_black_24dp">
              قالب جدید
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {data?.map((item) => {
              return <Card key={item.titles} {...item} />;
            })}
          </div>
        </div>
      </Box>
    </InApp>
  );
};

export default Templates;
