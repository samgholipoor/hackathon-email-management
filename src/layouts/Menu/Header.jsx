import { useMemo } from "react";
import Menu from "./Menu";

const Header = () => {
  const menuItems = useMemo(() => {
    return [
      {
        title: "ارسال پیام",
        to: "/send-email",
        icon: "email_black_24dp",
      },
      {
        title: "قالب‌ها",
        to: "/templates",
        icon: "contract_edit_24dp",
      },
      {
        title: "دسته‌بندی قالب‌ها",
        to: "/template-category",
        icon: "category_24dp",
      },
    ].filter(Boolean);
  }, []);

  return (
    <>
      <div
        className="h-screen overflow-hidden hidden md:flex md:flex-col md:justify-between bg-base-100 py-4 md:px-4 fixed top-0 left-auto"
        style={{ width: "240px" }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 p-4 border-b">
            <div>
              <img src="/phiedi.png" alt="pheidi" className="w-10 h-10" />
            </div>
            <div className="font-bold">فیدیپیدس</div>
          </div>
          <div className="flex flex-col">
            {menuItems ? (
              <Menu menuItems={menuItems} className="w-full md:w-auto" />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
