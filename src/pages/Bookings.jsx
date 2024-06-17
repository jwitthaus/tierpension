import { addDays, differenceInCalendarDays, format, subDays } from "date-fns";
import { animate } from "framer-motion";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useQuery, useQueryClient } from "react-query";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import DateBar from "../components/Bookings/Timeline/DateBar";
import Timeline from "../components/Bookings/Timeline/Timeline";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";
import { FilterContext } from "../components/Bookings/Toolbar/FilterProvider.jsx";
import { TimelineSettingsContext } from "../components/Bookings/Toolbar/TimelineSettingsProvider.jsx";
import styles from "./Bookings.module.css";

export default function Bookings(props) {
  const { visibleDays } = useContext(TimelineSettingsContext);

  const queryClient = useQueryClient();

  //Tage errechnen sich aus Tag der Rückgabe der spätesten Buchung - heutiges Datum (in Tagen)
  //--> vorausgesetzt man kann nicht in die Vergangenheit scrollen
  //diese Zahl wird dann als Spaltenzahl verwendet

  //just for testing until DB is there -> later start and end date are given from db. duration will be calculated from components
  //wir sollten auf den kalkulierten letzten Tag aus der DB noch 30 Tage drauf rechnen, damit wir bei Click in der CustomerListe auch IMMER den ersten Tag in der linkesten Spalte haben
  //ansonsten kann es sein, wenn die letzte Buchung nur zwei Tage hat, dass sie ganz rechts am Rand hängt und nicht automatisch nach links scrollt
  const emptyOffsetAtTimelineEnd = 30;
  const offsetBeforeToday = 14;
  const timelineLength = 64 + emptyOffsetAtTimelineEnd + offsetBeforeToday;
  const today = new Date();
  const timelineStart = subDays(today, offsetBeforeToday); //to be configurable from config file or database
  const timelineEnd = addDays(timelineStart, timelineLength);

  const capacityRef = useRef(null);
  const timelineRef = useRef(null);

  const [lastTimelineScale, setLastTimelineScale] = useState(
    (timelineLength / visibleDays) * 100
  );
  const [timelineScale, setTimelineScale] = useState(
    (timelineLength / visibleDays) * 100
  );

  //visible Days changed
  useEffect(() => {
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
        //console.log(timelineScale);
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
  }, [visibleDays]);

  const handleScrollTimeline = (scroll) => {
    capacityRef.current.scrollLeft = scroll.target.scrollLeft;
  };

  const scrollToDateCallback = useCallback((date) => {
    let difference = differenceInCalendarDays(date, timelineStart);
    let scrollPosition =
      (difference * timelineRef.current?.offsetWidth) / visibleDays;
    animate(timelineRef.current.scrollLeft, scrollPosition, {
      ease: "linear",
      onUpdate: (latest) => (timelineRef.current.scrollLeft = latest),
    });
    //timelineRef.current.scrollLeft = scrollPosition;
  }, []);
  return (
    <>
      <div className={styles.bookings}>
        <div className={styles.toparea}>
          <div className={styles.toolbar}>
            <BookingsToolBar />
          </div>
          <div ref={capacityRef} className={styles.capacity}>
            <Capacity
              timelineScale={timelineScale}
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              data={props.data}
            />
            <DateBar
              timelineScale={timelineScale}
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              data={props.data}
            />
          </div>
        </div>
        <div className={styles.bottomarea}>
          <div className={styles.customerList}>
            <CustomerList
              data={props.data}
              scrollToDateCallback={scrollToDateCallback}
            />
          </div>
          <div
            ref={timelineRef}
            className={styles.timeline}
            onScroll={handleScrollTimeline}
            //onMouseDown={handleMouseDownTimeline}
          >
            <Timeline
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              timelineScale={timelineScale}
              data={props.data}
              scrollToDateCallback={scrollToDateCallback}
            />
          </div>
        </div>
      </div>
    </>
  );
}
