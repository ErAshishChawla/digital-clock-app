import useClockContext from "../hooks/useClockContext";

function DynamicMessage() {
  const { clockData, timeLimits } = useClockContext();
  const { timeSegment } = clockData;

  return (
    <div className="flex items-center text-2xl font-light">
      <div className="flex justify-center items-center mr-2">
        {timeLimits[timeSegment].icon}
      </div>
      <div>{timeLimits[timeSegment].text}</div>
    </div>
  );
}

export default DynamicMessage;
