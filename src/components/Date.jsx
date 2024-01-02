import useClockContext from "../hooks/useClockContext";
function Date() {
  const { clockData } = useClockContext();
  return (
    <div className="text-3xl font-light first-letter:text-red-600 first-letter:text-5xl">
      {clockData.currentDate}
    </div>
  );
}

export default Date;
