import { useMemo } from "react";
import { mergeClassNames } from "@/utils/classname";
import { generateUUID } from "@/utils/uuid";
import Button from "./Button.jsx";

const TYPE_BUTTON_TYPE = {
  primary: "submit",
  danger: "button",
  normal: "button",
};

export const actionButton = ({
  name = generateUUID(),
  title,
  type = "normal",
  iconName = "",
  onClick = () => {},
  loading = false,
  outlined = false,
  disabled = false,
}) => ({
  name,
  type,
  title,
  buttonType: TYPE_BUTTON_TYPE[type],
  iconName,
  onClick,
  loading,
  outlined,
  disabled,
});

export default function ActionButtons({
  growButtons = false,
  message = "",
  className,
  buttons = [],
  onClick = () => {},
  size = "md",
  containerClassName,
  ...props
}) {
  const handleClick = (button) => {
    button.onClick();
    onClick?.(button.name);
  };

  const containerClass = useMemo(
    () =>
      mergeClassNames(
        !growButtons && "flex flex-row-reverse items-center",
        className
      ),
    [className, growButtons]
  );

  return (
    <div className={containerClass} {...props}>
      <div className="flex-grow text-sm text-gray-600">{message}</div>
      <div
        className={mergeClassNames(
          "gap-2 flex flex-row items-center",
          containerClassName
        )}
      >
        {buttons.map((button) => (
          <Button
            key={button.name}
            onClick={() => handleClick(button)}
            type={button.buttonType}
            primary={button.type === "primary"}
            iconName={button.iconName}
            inProgress={button.loading}
            outlined={button.outlined}
            // disabled={button.disabled}
            color={button.color}
          >
            {button.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
