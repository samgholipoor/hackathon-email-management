import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Box from "./Box.jsx";
import ActionButtons, { actionButton } from "./ActionButtons";

interface Props {
  message?: string;
  callback: () => void;
  removeUIFallback: () => void;
  loading: boolean;
}

const ErrorBoundaryFallback = ({
  message,
  callback,
  removeUIFallback,
  loading,
}: Props) => {
  const navigate = useNavigate();

  const buttons = useMemo(() => {
    const actionButtons = [
      actionButton({
        title: "بازگشت",
        type: "primary",
        iconName: "arrow-backward-large-o",
        onClick: () => {
          navigate(-1);
          removeUIFallback();
        },
        outlined: true,
      }),
    ];

    if (callback) {
      actionButtons.push(
        actionButton({
          title: "تلاش مجدد",
          type: "primary",
          iconName: "refresh",
          onClick: callback,
          loading: loading,
        })
      );
    }

    return actionButtons;
  }, [loading]);

  return (
    <Box className="flex justify-between items-center w-fit">
      <div className="flex flex-col items-center gap-6 p-6">
        <div className="w-28 h-28">
          <img src="/assets/images/logo.svg" className="w-full h-full" />
        </div>
        <div>{message || "خطای نامشخصی رخ داده است"}</div>
        <div className="flex justify-center gap-4 w-full">
          <ActionButtons buttons={buttons} />
        </div>
      </div>
    </Box>
  );
};

export default ErrorBoundaryFallback;
