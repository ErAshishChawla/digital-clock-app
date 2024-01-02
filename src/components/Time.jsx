import useClockContext from "../hooks/useClockContext";
import { useEffect } from "react";

function Time() {
  const { clockData, setClockData, getClockData, isLoading, currentLocation } =
    useClockContext();

  useEffect(() => {
    setInterval(() => {
      setClockData(getClockData);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mb-5">
      <div className="text-[6rem] font-semibold first-letter:text-red-600">
        {clockData.currentTime}
      </div>
      <div className="text-3xl font-light">
        {isLoading ? "Loading..." : currentLocation.timeZoneName}
      </div>
    </div>
  );
}

export default Time;
