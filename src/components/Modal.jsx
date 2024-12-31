import {
  useMemo,
  useContext,
  useCallback,
  createContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import Icon from "@/components/Icon";
import { mergeClassNames } from "@/utils/classname";
import { generateUUID } from "@/utils/uuid";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import Box from "./Box";

const MODALS_ELEMENT_ID = "modals";
const TOASTS_ELEMENT_ID = "toasts";

const overlayContext = createContext({
  showToast: () => {},
});

export function Modal({ children, className, onClose, fullheight }) {
  const modalContainerRef = useRef(null);

  const root = document.getElementById(MODALS_ELEMENT_ID);

  useOnClickOutside(modalContainerRef, onClose);

  useEffect(() => {
    if (document.body.style.overflowY !== "hidden") {
      document.body.style.overflowY = "hidden";
      document.querySelectorAll("table").forEach((elTable) => {
        if (elTable.parentNode) {
          elTable.parentNode.style.overflow = "hidden";
        }
      });
    }

    return () => {
      if (document.body.style.overflowY !== "auto") {
        document.body.style.overflowY = "auto";
        document.querySelectorAll("table").forEach((elTable) => {
          if (elTable.parentNode) {
            elTable.parentNode.style.overflow = "auto	";
          }
        });
      }
    };
  }, []);

  const content = useMemo(
    () => (
      <div className="fixed top-0 left-0 w-screen h-full flex items-end md:items-center justify-center backdrop-blur-sm bg-black bg-opacity-30 md:p-4 z-30">
        <Box
          ref={modalContainerRef}
          round={false}
          className={mergeClassNames(
            "w-full p-4 max-w-4xl overflow-auto",
            {
              "h-full": fullheight,
            },
            {
              "md:rounded-md rounded-t-md": !fullheight,
            },
            {
              "md:rounded-md": fullheight,
            },
            className
          )}
        >
          {fullheight ? (
            <div className="flex flex-row-reverse lg:hidden">
              <Icon
                onClick={onClose}
                name="close_black_24dp"
                className="w-8 mb-8"
              />
            </div>
          ) : null}

          {children}
        </Box>
      </div>
    ),
    [children, modalContainerRef]
  );

  return root && createPortal(content, root);
}

const TOAST_TYPE_TO_ICON = {
  info: "info_black_24dp",
  success: "check_circle_black_24dp",
  warning: "error_black_24dp",
  error: "highlight_off_black_24dp",
};

export const Toast = ({ children, type = "info" }) => {
  const root = document.getElementById(TOASTS_ELEMENT_ID);
  const content = (
    <div className="alert shadow-lg">
      <div className="flex items-center gap-2">
        <Icon
          name={TOAST_TYPE_TO_ICON[type]}
          className={mergeClassNames("w-7 h-7", `!text-${type}`)}
        />
        <div className="text-lg text-start">{children}</div>
      </div>
    </div>
  );
  return root && createPortal(content, root);
};

export const useOverlay = () => useContext(overlayContext);

export function OverlaysProvider({ children }) {
  const [overlays, setOverlays] = useState([]);

  const showToast = useCallback(
    (text, type, timeout = 4000) =>
      new Promise((resolve) => {
        const overlayObject = {
          id: generateUUID(),
          Component: Toast,
          props: {
            type,
            children: text,
          },
        };

        setOverlays((prevOverlays) => {
          for (let i = 0; i < prevOverlays.length; i++) {
            const overlayText = prevOverlays[i].props.children;

            if (overlayText === text) {
              return prevOverlays;
            }
          }

          return [...prevOverlays, overlayObject];
        });

        setTimeout(() => {
          setOverlays((prev) => {
            const index = prev.indexOf(overlayObject);

            if (index > -1) {
              resolve();
              return [...prev.slice(0, index), ...prev.slice(index + 1)];
            }

            return prev;
          });
        }, timeout);
      }),
    []
  );

  const providerValue = useMemo(
    () => ({
      showToast,
    }),
    [showToast]
  );

  return (
    <overlayContext.Provider value={providerValue}>
      {children}
      <div id={MODALS_ELEMENT_ID} />
      <div
        id={TOASTS_ELEMENT_ID}
        className="right-0 bottom-0 w-full max-w-md p-2 space-y-2 fixed flex-col flex items-end pointer-events-none"
        style={{ zIndex: 999999 }}
        onClick={(e) => e.stopPropagation()}
      >
        {overlays.map((overlay) => (
          <overlay.Component key={overlay.id} {...overlay.props} />
        ))}
      </div>
    </overlayContext.Provider>
  );
}
