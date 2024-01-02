import useClasses from "../hooks/useClasses.jsx";
function Tile({ title, value, className }) {
  return (
    <div
      className={useClasses(
        "flex flex-col justify-center items-center w-full",
        className
      )}
    >
      <div className="text-md uppercase m-1 font-light w-full text-lg">
        {title}
      </div>
      <div className="uppercase text-2xl m-1 font-semibold w-full">{value}</div>
    </div>
  );
}

export default Tile;
