import { useNavigate } from "react-router-dom";

export default function Card({ to, src, title }) {
  const navigate = useNavigate();

  return (
    <div className="card bg-base-100 shadow-md cursor-pointer">
      <div className="h-60">
        <iframe
          src={src}
          title="HTML Content"
          className="border h-full w-full"
        />
      </div>
      {/* <figure className="h-36">
        <img
          src={imageSrc}
          alt="Shoes"
          className="w-full h-full object-cover"
        />
      </figure> */}
      <div className="card-body p-4 border-t flex flex-row justify-between">
        <h2 className="card-title text-base">{title}</h2>
        <button
          className="btn btn-primary btn-sm w-32 h-10 max-h-10"
          onClick={() => {
            navigate(to);
          }}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
