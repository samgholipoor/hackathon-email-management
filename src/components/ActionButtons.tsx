import { useMemo } from "react";
import { mergeClassNames } from "@/utils/classname";
import { generateUUID } from "@/utils/uuid";

const TYPE_BUTTON_TYPE = {
  primary: "submit",
  danger: "button",
  normal: "button",
};

const BUTTON_COLOR = {
  danger: "btn-danger",
  warning: "btn-warning",
  primary: "btn-primary",
  normal: "btn-normal",
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
  color: BUTTON_COLOR[type],
  onClick,
  loading,
  outlined,
  disabled,
});

interface ActionButtonsProps {
  growButtons?: boolean;
  message?: string;
  className?: string;
  buttons: ReturnType<typeof actionButton>[];
  onClick?: (e: any) => any;
  size?: "md" | "sm";
  containerClassName?: string;
}

export default function ActionButtons({
  growButtons = false,
  message = "",
  className,
  buttons = [],
  onClick = () => {},
  size = "md",
  containerClassName,
  ...props
}: ActionButtonsProps) {
  const handleClick = (button: any) => {
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
          <button
            key={button.name}
            onClick={() => handleClick(button)}
            type={button.buttonType}
            primary={button.type === "primary"}
            iconName={button.iconName}
            inProgress={button.loading}
            outlined={button.outlined}
            disabled={button.disabled}
            className={mergeClassNames("btn flex-grow", button.color)}
          >
            {button.title}
          </button>
        ))}
      </div>
    </div>
  );
}
