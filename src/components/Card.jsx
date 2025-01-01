import Icon from "@/components/Icon.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowHtmlTemplate from "./ShowHtmlTemplate.jsx";
import { Modal } from "./Modal.jsx";

export default function Card({ to, src, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="card bg-base-100 shadow-md cursor-pointer">
        <div className="h-60">
          <iframe
            src={src}
            title="HTML Content"
            className="border h-full w-full"
          />
        </div>
        <div className="card-body p-4 border-t flex flex-row justify-between">
          <h2 className="card-title text-base">{title}</h2>
          <div className="flex items-center gap-2">
            <button
              className="btn bg-base-300 btn-sm w-16 h-10 max-h-10"
              onClick={() => setIsOpen(true)}
            >
              <Icon className="w-5" name="visibility_black_24dp" />
            </button>
            <button
              className="btn btn-primary btn-sm w-24 h-10 max-h-10"
              onClick={() => {
                navigate(to);
              }}
            >
              ارسال
            </button>
          </div>
        </div>
      </div>
      {isOpen ? (
        <Modal onClose={() => setIsOpen(false)} className="max-w-6xl">
          <ShowHtmlTemplate src={src} onClose={() => setIsOpen(false)} />
        </Modal>
      ) : null}
    </>
  );
}
