export function ContentCard({ title, image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative flex-shrink-0 cursor-pointer group"
    >
      <div className="w-[200px] h-[300px] overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <h3 className="text-white text-center px-2">{title}</h3>
      </div>
    </div>
  );
}
