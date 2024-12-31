import { forwardRef } from "react";
import { mergeClassNames } from "@/utils/classname";

const Box = forwardRef((refProps, ref) => {
  const {
    children,
    className,
    component = "div",
    header,
    footer,
    round = true,
    hasShaow,
    ...props
  } = refProps;
  const Component = component;

  return (
    <Component
      className={mergeClassNames(
        "bg-base-100 overflow-auto",
        {
          "shadow-sm": hasShaow,
        },
        {
          "rounded-md": round,
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {header && (
        <div className="text-base font-semibold text-base-content text-opacity-90 p-4 h-14 flex items-center justify-center whitespace-nowrap overflow-hidden">
          {header}
        </div>
      )}
      {children}
      {footer && (
        <div className="text-xs text-gray-400 py-2 px-4 flex items-center border-t">
          {footer}
        </div>
      )}
    </Component>
  );
});

export default Box;
