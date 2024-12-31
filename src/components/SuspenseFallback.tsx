import { mergeClassNames } from "@/utils/classname";
import Box from "./Box.jsx";
import { Spinner } from "./Spinner";

interface SuspenseFallbackProps {
  message?: string;
  className?: string;
}

const SuspenseFallback = ({
  message = "صفحه درحال بارگذاری است",
  className,
}: SuspenseFallbackProps) => {
  return (
    <Box
      className={mergeClassNames(
        className,
        "flex justify-center items-center text-sm gap-4 p-4 md:p-6"
      )}
    >
      {message}
      <Spinner className="w-5 h-5" />
    </Box>
  );
};

export default SuspenseFallback;
