import { useNavigate } from "react-router-dom";

export default function CardCategory({ to, imageSrc, title }) {
  const navigate = useNavigate();

  return (
    <div
      className="card bg-base-100 shadow-md cursor-pointer"
      onClick={() => {
        navigate(to, {
          state: title,
        });
      }}
    >
      <div className="grid grid-cols-2">
        {imageSrc.map((src) => (
          <figure className="relative h-32 border-2">
            <img src={src} className="w-full h-full object-cover" />
            <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-15"></div>
          </figure>
        ))}
      </div>
      <div className="card-body p-4 border-t">
        <h2 className="card-title text-lg">{title}</h2>
      </div>
    </div>
  );
}
