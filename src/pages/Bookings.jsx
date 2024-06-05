import React, { useRef, useState } from "react";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import Timeline from "../components/Bookings/Timeline/Timeline";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";
import styles from "./Bookings.module.css";
import moment from "moment";
import DateBar from "../components/Bookings/Timeline/DateBar";
import { addDays, differenceInCalendarDays } from "date-fns";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      //Niklas fragen, ob das bei ihm 15 ode 16 Tage sind? --> es sind zwar 16 Tage aber 15 Übernachtungen
      //Der Balken fängt am 2. an, aber wann soll er aufhören? Inklusive 8.?
      dayStart: new Date(2024, 5, 3),
      dayEnd: new Date(2024, 5, 4),
      firstName: "Holger",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 5, 4),
      dayEnd: new Date(2024, 5, 24),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 5, 5),
      dayEnd: new Date(2024, 5, 8),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 5, 9),
      dayEnd: new Date(2024, 5, 24),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 6, 1),
      dayEnd: new Date(2024, 6, 10),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 6, 12),
      dayEnd: new Date(2024, 6, 24),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 6, 15),
      dayEnd: new Date(2024, 6, 26),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
    {
      dayStart: new Date(2024, 6, 18),
      dayEnd: new Date(2024, 6, 22),
      firstName: "Jörg",
      lastName: "Witthaus",
    },
  ]);

  const groupBookings = () => {
    //statt bookings hier im code zu gruppieren, Vorschlag von Papa:
    //erst werden aus der DB die Monatsgruppen abgefragt
    //diese werden dann per forEach durchiteriert und die jeweiligen Buchungen aus der Datenbank abgefragt
    let grouped = [];
    let monthIterator = "";

    bookings.forEach((element) => {
      let group = moment(element.dayStart).format("MMMM 'YY");
      if (group !== monthIterator) {
        //noch keine Gruppe für den Monat
        //--> Gruppe erzeugen
        let obj = {};
        obj.title = group;
        obj.bookings = bookings.filter(
          (booking) => moment(booking.dayStart).format("MMMM 'YY") === group
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
    setVisibleDays(days);
  };
  //Tage errechnen sich aus Tag der Rückgabe der spätesten Buchung - heutiges Datum (in Tagen)
  //--> vorausgesetzt man kann nicht in die Vergangenheit scrollen
  //diese Zahl wird dann als Spaltenzahl verwendet
  const timelineLength = 30; //just for testing until DB is there -> later start and end date are given from db. duration will be calculated from components
  const today = new Date();
  const timelineStart = today; //to be configurable from config file or database
  const timelineEnd = addDays(timelineStart, timelineLength);

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
            <BookingsToolBar callbackChangeDays={handleChangeVisibleDays} />
          </div>
          <div
            ref={capacityRef}
            className={styles.capacity}
            onScroll={handleScrollCapacity}
          >
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
            <CustomerList data={groupedBookings} />
          </div>
          <div
            ref={timelineRef}
            className={styles.timeline}
            onScroll={handleScrollTimeline}
          >
            <Timeline
              visibleDays={visibleDays}
              timelineStart={timelineStart}
              timelineEnd={timelineEnd}
              data={groupedBookings}
            />
          </div>
        </div>
      </div>
    </>
  );
}
