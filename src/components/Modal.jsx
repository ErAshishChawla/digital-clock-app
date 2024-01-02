import Tile from "./Tile";
import useClockContext from "../hooks/useClockContext";
import "./Modal.css";
import { forwardRef } from "react";

const Modal = forwardRef(function Modal(props, ref) {
  const { currentLocation, clockData, isLoading } = useClockContext();
  const { showModal } = props;

  const moveUpStyle = {
    animation: "MoveUp 1s ease-in-out",
    transform: "translateY(0%)",
  };

  const moveDownStyle = {
    animation: "MoveDown 1s ease-in-out",
    transform: "translateY(100%)",
  };

  return (
    <div
      className="absolute bottom-[0] text-black w-screen flex justify-center  items-center bg-slate-300 z-[3] px-8 py-4 Modal"
      style={showModal ? moveUpStyle : moveDownStyle}
      ref={ref}
    >
      <div className="flex justify-between items-center w-full max-w-[40rem]">
        <div className="flex flex-col justify-center items-center">
          <Tile title="current timezone" value={currentLocation.timeZoneName} />
          <Tile title="day of the year" value={clockData.dayOfYear} />
        </div>
        <div className="flex flex-col justify-center items-center">
          <Tile title="day of the week" value={clockData.dayOfWeek + 1} />
          <Tile title="week number" value={clockData.weekNumber} />
        </div>
      </div>
    </div>
  );
});

export default Modal;
