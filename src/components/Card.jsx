export default function Card({ imageSrc, title }) {
  return (
    <div className="card bg-base-100 shadow-md cursor-pointer">
      <figure className="h-36">
        <img
          src={imageSrc}
          alt="Shoes"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4 border-t">
        <h2 className="card-title text-base">{title}</h2>
      </div>
    </div>
  );
}
