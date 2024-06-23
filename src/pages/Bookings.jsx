import React, { useContext, useEffect, useRef } from "react";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import Timeline from "../components/Bookings/Timeline/Timeline.jsx";
import { TimelineSettingsContext } from "../components/Bookings/Timeline/TimelineSettingsProvider.jsx";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";
import styles from "./Bookings.module.css";

export default function Bookings() {
  const {
    timelineScale,
    prevTimelineScale,
    timelineStart,
    calculatePercentage,
  } = useContext(TimelineSettingsContext);

  const capacityRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const scrollPosition =
      (timelineRef.current.scrollLeft * timelineScale) / prevTimelineScale;
    timelineRef.current.scrollLeft = scrollPosition;
  }, [timelineScale, prevTimelineScale]);

  //visible Days changed
  /*useEffect(() => {
    const relativeScrollPosition =
      visibleDays === 31
        ? (7 * timelineRef.current.scrollLeft) / 31
        : (31 * timelineRef.current.scrollLeft) / 7;
    const targetScale = (timelineLength / visibleDays) * 100;
    animate(lastTimelineScale, targetScale, {
      ease: "linear",
      onUpdate: (latest) => {
        setTimelineScale(latest);
        //console.log("scale: " + latest);
      },
      onComplete: () => {
        setLastTimelineScale(targetScale);
        console.log(timelineScale);
      },
    });
    animate(timelineRef.current.scrollLeft, relativeScrollPosition, {
      ease: "linear",
      onUpdate: (latest) => {
        timelineRef.current.scrollLeft = latest;
        capacityRef.current.scrollLeft = latest;
        //console.log("scroll: " + latest);
      },
    });
  }, [visibleDays, timelineLength, lastTimelineScale]);*/

  const handleScrollTimeline = (scroll) => {
    capacityRef.current.scrollLeft = scroll.target.scrollLeft;
  };

  const scrollToDateCallback = (date) => {
    const { startPosition } = calculatePercentage(date, timelineStart); //position in %
    const scrollPosition =
      (startPosition * timelineRef.current?.offsetWidth) / 100;

    timelineRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };
  return (
    <>
      <div className={styles.bookings}>
        <div className={styles.toparea}>
          <div className={styles.toolbar}>
            <BookingsToolBar />
          </div>
          <div ref={capacityRef} className={styles.capacity}>
            <Capacity />
          </div>
        </div>
        <div className={styles.bottomarea}>
          <div className={styles.customerList}>
            <CustomerList scrollToDateCallback={scrollToDateCallback} />
          </div>
          <div
            ref={timelineRef}
            className={styles.timeline}
            onScroll={handleScrollTimeline}
            //onMouseDown={handleMouseDownTimeline}
          >
            <Timeline />
          </div>
        </div>
      </div>
    </>
  );
}
