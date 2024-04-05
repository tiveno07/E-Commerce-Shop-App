import React from "react";
import styles from "../../../styles/styles";
import { EventCard } from "./EventCard.jsx";
import { useSelector } from "react-redux";

export const Events = () => {
  const { allEvent, isLoading } = useSelector((state) => state?.events);

  return (
    <div className={`${styles.section}`}>
      <div className={`${styles.headings}`}>
        <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
        <EventCard data={allEvent} isLoading={isLoading} />
      </div>
    </div>
  );
};
