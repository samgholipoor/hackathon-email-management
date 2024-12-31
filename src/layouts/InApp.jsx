import { mergeClassNames } from "@/utils/classname";
import Header from "./Menu/Header";

const InApp = ({ containerClassName, children }) => {
  return (
    <div>
      <Header />

      <div className="flex justify-between items-start">
        <div
          className={mergeClassNames(
            "w-full overflow-auto mx-0 mb-0 mt-4 md:m-8 md:mr-64 md:pr-4",
            containerClassName
          )}
          style={{ width: "-webkit-fill-available" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default InApp;
