import DynamicMessage from "./DynamicMessage";
import Time from "./Time";
import Date from "./Date";
import Location from "./Location";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Modal from "./Modal";
import { useState, useRef, useEffect } from "react";
import useClasses from "../hooks/useClasses";

function Clock() {
  const [showModal, setShowModal] = useState(false);
  const locationRef = useRef();
  const modalRef = useRef();
  const enableModal = useRef(false);

  useEffect(() => {
    if (modalRef.current && showModal) {
      const modalHeight = modalRef.current.offsetHeight;
      locationRef.current.style.transform = `translateY(calc(-${modalHeight}px + 2.5rem))`;
      locationRef.current.style.transition = "transform 1s ease-in-out";
    } else if (modalRef.current && !showModal) {
      locationRef.current.style.transform = `translateY(0px)`;
      locationRef.current.style.transition = "transform 1s ease-in-out";
    }
  }, [showModal]);

  const handleClick = () => {
    setShowModal((prevVal) => {
      return !prevVal;
    });

    enableModal.current = true;
  };
  return (
    <div
      className={useClasses(
        "z-[2] w-full flex flex-col grow items-center justify-between"
      )}
    >
      <div className="flex flex-col justify-center items-center">
        <DynamicMessage />
        <Time />
        <Date />
      </div>
      <div className="flex flex-col w-full justify-center items-center">
        <div
          className={useClasses("flex items-center w-full justify-between")}
          ref={locationRef}
        >
          <Location />
          <button
            className="flex justify-center items-center text-lg font-semibold text-black bg-white rounded-full px-3 py-2 uppercase"
            onClick={handleClick}
          >
            {!showModal ? "more" : "less"}
            <div className="flex justify-center items-center w-5 h-5 rounded-full bg-black text-white font-bold box-content p-0.5 ms-2">
              {!showModal ? <FaChevronDown /> : <FaChevronUp />}
            </div>
          </button>
        </div>
        {enableModal.current && <Modal showModal={showModal} ref={modalRef} />}
      </div>
    </div>
  );
}

export default Clock;
