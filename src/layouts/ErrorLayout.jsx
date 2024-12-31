import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@/components/Box.jsx";
import Icon from "@/components/Icon.jsx";
import ActionButtons, { actionButton } from "@/components/ActionButtons.jsx";

export default function ErrorLayout({ code, message }) {
  const navigate = useNavigate();

  const handleReloadButtonClick = useCallback(() => {
    window.location.reload();
  }, []);

  const buttons = useMemo(
    () => [
      actionButton({
        title: "بازگشت",
        type: "primary",
        iconName: "arrow-backward-large-o",
        onClick: () => navigate(-1),
        outlined: true,
      }),
      actionButton({
        title: "تلاش مجدد",
        type: "primary",
        iconName: "refresh",
        onClick: handleReloadButtonClick,
      }),
    ],
    []
  );

  return (
    <div className="h-full min-h-screen flex justify-center bg-base-300">
      <Box className="container my-auto max-w-xs">
        <div className="text-center my-1 p-3">
          <div>
            <Icon name="error_outline_black_24dp" className="w-14 h-14" />
          </div>
          <h1 className="text-2xl font-bold text-gray-700 flex items-center justify-center">
            <span>
              {"خطا "}
              {code || "500"}
            </span>
          </h1>
          <p className="text-sm text-gray-500">
            {message || "Bad Things Happened!"}
          </p>
        </div>
        <div className="p-3 pt-0 text-center flex flex-row items-center justify-center gap-2">
          <ActionButtons buttons={buttons} />
        </div>
      </Box>
    </div>
  );
}
