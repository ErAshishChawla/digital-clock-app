import { createContext, useState } from "react";
import {
  BsFillSunriseFill,
  BsFillSunFill,
  BsFillSunsetFill,
  BsFillMoonFill,
} from "react-icons/bs";

const ClockContext = createContext();

function getTimeData(hr, min, sec) {
  const date = new Date();
  date.setHours(hr, min, sec);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    timeStyle: "short",
  });
}

const timeLimits = {
  0: {
    title: "early_morning",
    text: "Whoa, Early Bird, IT'S CURRENTLY",
    hours: getTimeData(4, 0, 0),
    icon: <BsFillSunriseFill />,
    background: "/images/earlyMorning.webp",
  },

  1: {
    title: "morning",
    text: "Good Morning, IT'S CURRENTLY",
    hours: getTimeData(7, 0, 0),
    icon: <BsFillSunFill />,
    background: "/images/morning.webp",
  },

  2: {
    title: "afternoon",
    text: "Good Afternoon, IT'S CURRENTLY",
    hours: getTimeData(12, 0, 0),
    icon: <BsFillSunFill />,
    background: "/images/afternoon.webp",
  },

  3: {
    title: "evening",
    text: "Good Evening, IT'S CURRENTLY",
    hours: getTimeData(17, 0, 0),
    icon: <BsFillSunsetFill />,
    background: "/images/evening.webp",
  },
  4: {
    title: "evening",
    text: "Hey! Night Owl, IT'S CURRENTLY",
    hours: getTimeData(21, 0, 0),
    icon: <BsFillMoonFill />,
    background: "/images/night.webp",
  },
};

function ClockProvider({ children }) {
  const [clockData, setClockData] = useState(getClockData);
  const [currentLocation, setCurrentLocation] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function getClockData() {
    const date = new Date();

    const currentTime = date.toLocaleTimeString("en-US", {
      hour12: false,
      timeStyle: "short",
    });

    const currentDate = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });

    const timeSegment = isApplicable(currentTime);

    const dayOfWeek = date.getDay();

    function daysIntoYear(date) {
      return (
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
          Date.UTC(date.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000
      );
    }

    const dayOfYear = daysIntoYear(date);

    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil(days / 7);

    return {
      currentTime,
      currentDate,
      timeSegment,
      dayOfWeek,
      dayOfYear,
      weekNumber,
    };
  }

  function isApplicable(currentTime) {
    if (
      currentTime >= timeLimits[0].hours &&
      currentTime <= timeLimits[1].hours
    ) {
      return 0;
    } else if (
      currentTime >= timeLimits[1].hours &&
      currentTime <= timeLimits[2].hours
    ) {
      return 1;
    } else if (
      currentTime >= timeLimits[2].hours &&
      currentTime <= timeLimits[3].hours
    ) {
      return 2;
    } else if (
      currentTime >= timeLimits[3].hours &&
      currentTime <= timeLimits[4].hours
    ) {
      return 3;
    } else {
      return 4;
    }
  }

  return (
    <ClockContext.Provider
      value={{
        clockData,
        setClockData,
        currentLocation,
        setCurrentLocation,
        isLoading,
        setIsLoading,
        getClockData,
        timeLimits,
      }}
    >
      {children}
    </ClockContext.Provider>
  );
}

export default ClockProvider;
export { ClockContext };
