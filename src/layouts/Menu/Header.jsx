import { useMemo } from "react";
import Menu from "./Menu";

const Header = () => {
  const menuItems = useMemo(() => {
    return [
      {
        title: "ارسال پیام",
        iconName: "person",
        to: "/send-email",
        icon: "email_black_24dp",
      },
      {
        title: "دسته‌بندی قالب‌ها",
        iconName: "event-note",
        to: "/templates",
        icon: "contract_edit_24dp",
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
          <div className="p-4 border-b">
            <p>فیدیپیدس</p>
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
