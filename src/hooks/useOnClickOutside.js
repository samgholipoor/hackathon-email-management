import { useEffect } from "react";

export function useOnClickOutside(ref, callback) {
  useEffect(() => {
    const handleClick = (event) => {
      const el = ref?.current;

      if (!el || el.contains(event.target)) {
        return;
      }

      callback?.(event);
    };

    window.addEventListener("pointerdown", handleClick);

    return () => {
      window.removeEventListener("pointerdown", handleClick);
    };
  }, [ref]);

  return null;
}
