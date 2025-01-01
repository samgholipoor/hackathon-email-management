const ShowHtmlTemplate = ({ onClose, src }) => {
  return (
    <div>
      <div style={{ height: "calc(100vh - 140px)" }}>
        <iframe
          src={src}
          title="HTML Content"
          className="border h-full w-full"
        />
      </div>

      <button className="btn btn-primary mt-4" onClick={onClose}>
        بستن
      </button>
    </div>
  );
};

export default ShowHtmlTemplate;
