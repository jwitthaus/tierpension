import React, { useRef, useState } from "react";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import Timeline from "../components/Bookings/Timeline/Timeline";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";
import styles from "./Bookings.module.css";
import DateBar from "../components/Bookings/Timeline/DateBar";
import { addDays, differenceInCalendarDays, format, subDays } from "date-fns";
import { useDraggable } from "react-use-draggable-scroll";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      //Niklas fragen, ob das bei ihm 15 ode 16 Tage sind? --> es sind zwar 16 Tage aber 15 Übernachtungen
      //Der Balken fängt am 2. an, aber wann soll er aufhören? Inklusive 8.?
      dayStart: new Date(2024, 4, 23),
      dayEnd: new Date(2024, 5, 4),
      firstName: "Holger",
      lastName: "Witthaus",
      id: "booking1",
    },
    {
      dayStart: new Date(2024, 5, 4),
      dayEnd: new Date(2024, 5, 24),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking2",
    },
    {
      dayStart: new Date(2024, 5, 5),
      dayEnd: new Date(2024, 5, 8),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking3",
    },
    {
      dayStart: new Date(2024, 5, 9),
      dayEnd: new Date(2024, 5, 24),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking4",
    },
    {
      dayStart: new Date(2024, 6, 1),
      dayEnd: new Date(2024, 6, 10),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking5",
    },
    {
      dayStart: new Date(2024, 6, 12),
      dayEnd: new Date(2024, 6, 24),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking6",
    },
    {
      dayStart: new Date(2024, 6, 15),
      dayEnd: new Date(2024, 6, 26),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking7",
    },
    {
      dayStart: new Date(2024, 6, 18),
      dayEnd: new Date(2024, 6, 22),
      firstName: "Jörg",
      lastName: "Witthaus",
      id: "booking8",
    },
  ]);

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

  const groupBookings = () => {
    //statt bookings hier im code zu gruppieren, Vorschlag von Papa:
    //erst werden aus der DB die Monatsgruppen abgefragt
    //diese werden dann per forEach durchiteriert und die jeweiligen Buchungen aus der Datenbank abgefragt
    let grouped = [];
    let monthIterator = "";

    bookings.forEach((element) => {
      let group = format(element.dayStart, "MMMM yy");
      if (group !== monthIterator) {
        //noch keine Gruppe für den Monat
        //--> Gruppe erzeugen
        let obj = {};
        obj.title = group;
        obj.bookings = bookings.filter(
          (booking) =>
            format(booking.dayStart, "MMMM yy") === group &&
            differenceInCalendarDays(booking.dayEnd, timelineStart) >= 0
        );
        grouped.push(obj);

        monthIterator = group;
      }
    });

    return grouped;
  };
  const [groupedBookings, setGroupedBookings] = useState(groupBookings());

  const [visibleDays, setVisibleDays] = useState(7);
  const handleChangeVisibleDays = (days) => {
    //hier die aktuelle scrollPosition merken und umrechnen auf den neuen zoom
    //dann aus scrollLeft anwenden
    timelineRef.current.scrollLeft = (7 * timelineRef.current.scrollLeft) / 31;
    console.log(timelineRef.current.scrollLeft);
    setVisibleDays(days);
  };

  const capacityRef = useRef(null);
  const timelineRef = useRef(null);

  const { events } = useDraggable(timelineRef);

  const handleScrollTimeline = (scroll) => {
    capacityRef.current.scrollLeft = scroll.target.scrollLeft;
  };

  /*const handleMouseDownTimeline = React.useCallback((e) => {
    const ele = timelineRef.current;
    if (!ele) {
      return;
    }
    const startPos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };

    const handleMouseMove = (e) => {
      const dx = e.clientX - startPos.x;
      const dy = e.clientY - startPos.y;
      ele.scrollTop = startPos.top - dy;
      ele.scrollLeft = startPos.left - dx;
      updateCursor(ele);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      resetCursor(ele);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  const updateCursor = (ele) => {
    ele.style.cursor = "grabbing";
    ele.style.userSelect = "none";
  };

  const resetCursor = (ele) => {
    ele.style.cursor = "grab";
    ele.style.removeProperty("user-select");
  };*/

  function scrollToDateCallback(date) {
    let difference = differenceInCalendarDays(date, timelineStart);
    console.log(timelineRef.current?.offsetWidth);
    let scrollPosition =
      (difference * timelineRef.current?.offsetWidth) / visibleDays;
    timelineRef.current.scrollLeft = scrollPosition;
  }
  return (
    <>
      <div className={styles.bookings}>
        <div className={styles.toparea}>
          <div className={styles.toolbar}>
            <BookingsToolBar callbackChangeDays={handleChangeVisibleDays} />
          </div>
          <div ref={capacityRef} className={styles.capacity}>
            <Capacity
              visibleDays={visibleDays}
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              data={groupedBookings}
            />
            <DateBar
              visibleDays={visibleDays}
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              data={groupedBookings}
            />
          </div>
        </div>
        <div className={styles.bottomarea}>
          <div className={styles.customerList}>
            <CustomerList
              data={groupedBookings}
              scrollToDateCallback={scrollToDateCallback}
            />
          </div>
          <div
            {...events}
            ref={timelineRef}
            className={styles.timeline}
            onScroll={handleScrollTimeline}
            //onMouseDown={handleMouseDownTimeline}
          >
            <Timeline
              visibleDays={visibleDays}
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              data={groupedBookings}
              scrollToDateCallback={scrollToDateCallback}
            />
          </div>
        </div>
      </div>
    </>
  );
}
