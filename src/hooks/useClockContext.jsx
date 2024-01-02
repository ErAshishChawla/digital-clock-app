import { useContext } from "react";
import { ClockContext } from "../context/ClockProvider";
function useClockContext() {
  const value = useContext(ClockContext);
  return value;
}

export default useClockContext;
