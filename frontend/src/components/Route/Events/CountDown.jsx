import React, { useEffect, useState } from "react";

export const CountDown = ({ event }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // console.log(event.events.name);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(event?.Finish_Date));
    }, 1000);
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const different = +new Date() - +new Date();
    let timeLeft = {};

    if (different > 0) {
      timeLeft = {
        days: Math.floor(different / (1000 * 60 * 60 * 24)),
        hours: Math.floor((different / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((different / (1000 * 60)) % 60),
        seconds: Math.floor((different / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft)?.map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }
    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      {timerComponents?.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time's Up</span>
      )}
    </div>
  );
};
