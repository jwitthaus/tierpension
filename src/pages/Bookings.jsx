import React, { useRef, useState } from "react";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import styles from "./Bookings.module.css";
import MyTimeline from "../components/Bookings/Timeline/MyTimeline";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";
import { Toolbar } from "@mui/material";

const Bookings = () => {
  const [timelineDays, setTimelineDays] = useState(7);
  const handleChangeTimelineDays = (days) => {
    setTimelineDays(days);
  };

  const capacityRef = useRef(null);
  const timelineRef = useRef(null);

  const handleScrollCapacity = (scroll) => {
    timelineRef.current.scrollLeft = scroll.target.scrollLeft;
  };

  const handleScrollTimeline = (scroll) => {
    capacityRef.current.scrollLeft = scroll.target.scrollLeft;
  };
  return (
    <>
      <div className={styles.bookings}>
        <div className={styles.toparea}>
          <div className={styles.toolbar}>
            <BookingsToolBar callbackChangeDays={handleChangeTimelineDays} />
          </div>
          <div
            ref={capacityRef}
            className={styles.capacity}
            onScroll={handleScrollCapacity}
          >
            <Capacity timelineDays={timelineDays} />
          </div>
        </div>
        <div className={styles.bottomarea}>
          <div className={styles.customerList}>
            <CustomerList />
          </div>
          <div
            ref={timelineRef}
            className={styles.timeline}
            onScroll={handleScrollTimeline}
          >
            <MyTimeline timelineDays={timelineDays} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
