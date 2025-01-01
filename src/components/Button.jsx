import { useMemo } from "react";
import { mergeClassNames } from "@/utils/classname";
import Icon from "@/components/Icon";
import { Spinner } from "@/components/Spinner.jsx";

export default function Button({
  component = "button",
  icon = "",
  disabled = false,
  color,
  size = "md",
  square = false,
  transparent,
  className,
  children,
  loading = false,
  isFullWidth = false,
  inProgress,
  ...props
}) {
  const Component = component;

  const colorClass = useMemo(
    () =>
      ({
        danger: "btn-danger",
        warning: "btn-warning",
        primary: "btn-primary",
        submit: "btn-primary",
        normal: "btn-normal",
        button: "btn-normal",
      }[color || props.type]),
    [color, props.type]
  );

  const sizeClass = useMemo(
    () =>
      ({
        md: mergeClassNames("h-10 text-sm", square && "w-10"),
        sm: mergeClassNames("h-8 text-sm", square && "w-8"),
      }[size]),
    [size]
  );

  const iconSizeClass = useMemo(
    () =>
      ({
        md: "w-5 h-5",
        sm: "w-4 h-4",
      }[size]),
    [size]
  );

  return (
    <Component
      className={mergeClassNames(
        "btn inline-flex items-center justify-center gap-2 rounded-md duration-150 whitespace-nowrap font-semibold relative overflow-hidden",
        { "w-full": isFullWidth },
        !square && "px-3",
        sizeClass,
        colorClass,
        !disabled &&
          "hover:bg-opacity-95 focus:bg-opacity-90 active:bg-opacity-90 cursor-pointer",
        disabled &&
          "text-base-content text-opacity-40 bg-opacity-0 cursor-not-allowed",
        className
      )}
      disabled={loading || disabled}
      {...props}
    >
      {loading && <Spinner className={iconSizeClass} />}
      {!loading && icon && <Icon name={icon} className={iconSizeClass} />}
      {children && <span>{children}</span>}
    </Component>
  );
}
