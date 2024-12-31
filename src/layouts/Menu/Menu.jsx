import { NavLink, useLocation } from "react-router-dom";
import { useMemo } from "react";
import { mergeClassNames } from "@/utils/classname";
import Icon from "@/components/Icon.jsx";

const Menu = ({ menuItems }) => {
  const { pathname, hash } = useLocation();

  const filteredMenuItems = useMemo(
    () =>
      menuItems.map((menuItem) => {
        let isOpen = false;

        if (pathname === menuItem.to) {
          isOpen = true;
        }

        return {
          ...menuItem,
          isOpen,
        };
      }),
    [menuItems, pathname, hash]
  );

  return (
    <div className="flex flex-col gap-2">
      {filteredMenuItems.map((menuItem) => {
        return (
          <MenuItem
            key={menuItem.title}
            {...menuItem}
            isActive={menuItem.isOpen}
          />
        );
      })}
    </div>
  );
};

export function MenuItem({ to, title, isActive = false, icon }) {
  return (
    <NavLink
      to={to}
      className={mergeClassNames("flex items-center gap-4 px-4 py-2 rounded", {
        "bg-primary bg-opacity-15": isActive,
      })}
    >
      <Icon
        name={icon}
        className={mergeClassNames("w-5", {
          "text-primary": isActive,
          "text-gray-500": !isActive,
        })}
      />
      <span className="text-gray-700">{title}</span>
    </NavLink>
  );
}

export default Menu;
