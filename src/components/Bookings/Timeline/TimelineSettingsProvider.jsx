import axios from "axios";
import { addDays, differenceInCalendarDays, format, subDays } from "date-fns";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { FilterContext } from "../Toolbar/FilterProvider";

export const TimelineSettingsContext = createContext();

export const TimelineSettingsProvider = ({ children }) => {
  //Tage errechnen sich aus Tag der Rückgabe der spätesten Buchung - heutiges Datum (in Tagen)
  //--> vorausgesetzt man kann nicht in die Vergangenheit scrollen
  //diese Zahl wird dann als Spaltenzahl verwendet

  //just for testing until DB is there -> later start and end date are given from db. duration will be calculated from components
  //wir sollten auf den kalkulierten letzten Tag aus der DB noch 30 Tage drauf rechnen, damit wir bei Click in der CustomerListe auch IMMER den ersten Tag in der linkesten Spalte haben
  //ansonsten kann es sein, wenn die letzte Buchung nur zwei Tage hat, dass sie ganz rechts am Rand hängt und nicht automatisch nach links scrollt
  const emptyOffsetAtTimelineEnd = 30;
  const offsetBeforeToday = 20;
  const today = new Date();
  const containerWidth = 100; // 100% of the container's width

  const { searchTerm } = useContext(FilterContext);
  const [visibleDays, setVisibleDays] = useState(7);
  const [timelineStart, setTimelineStart] = useState(
    subDays(today, offsetBeforeToday)
  ); //to be configurable from config file or database
  const [timelineLength, setTimelineLength] = useState(
    64 + emptyOffsetAtTimelineEnd + offsetBeforeToday + 1 //+1 because of today
  );
  const [timelineEnd, setTimelineEnd] = useState(
    addDays(timelineStart, timelineLength)
  );
  const [timelineScale, setTimelineScale] = useState(
    (containerWidth / visibleDays) * timelineLength
  );
  const [prevTimelineScale, setPrevTimelineScale] = useState(timelineScale);
  const [bookings, setBookings] = useState([]);
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);

  const dates = Array.from({ length: timelineLength }, (_, i) =>
    addDays(timelineStart, i)
  );

  const { data } = useQuery(["bookings-with-customers", searchTerm], () => {
    return axios.get(
      `http://localhost:8081/bookingsWithCustomers?search=${searchTerm}`
    );
  });

  const groupBookings = (input) => {
    //statt bookings hier im code zu gruppieren, Vorschlag von Papa:
    //erst werden aus der DB die Monatsgruppen abgefragt
    //diese werden dann per forEach durchiteriert und die jeweiligen Buchungen aus der Datenbank abgefragt
    let grouped = [];
    let monthIterator = "";

    input.forEach((element) => {
      let group = format(new Date(element.Beginn_Datum), "MMMM yy");
      if (group !== monthIterator) {
        //noch keine Gruppe für den Monat
        //--> Gruppe erzeugen
        let obj = {};
        obj.title = group;
        obj.bookings = input.filter(
          (booking) =>
            format(new Date(booking.Beginn_Datum), "MMMM yy") === group
          //&& differenceInCalendarDays(booking.Ende_Datum, timelineStart) >= 0 // this should be part of the sql query to get only current bookings
        );
        grouped.push(obj);

        monthIterator = group;
      }
    });

    return grouped;
  };

  // Function to calculate the percentage difference between two dates
  const calculatePercentage = (startDate, endDate) => {
    //hier noch die Logik einbauen falls der Start Termin in der Vergangenheit liegt
    const startPosition =
      (differenceInCalendarDays(startDate, timelineStart) / timelineLength) *
      timelineScale;
    const width =
      (differenceInCalendarDays(addDays(endDate, 1), startDate) /
        timelineLength) *
      timelineScale;
    return { startPosition, width };
  };

  useEffect(() => {
    if (data) {
      setBookings(data.data);
      const groupData = groupBookings(data.data);
      setGroupedBookings(groupData);
    }
  }, [data]);

  useEffect(() => {
    setPrevTimelineScale(timelineScale);
    setTimelineScale((containerWidth / visibleDays) * timelineLength);
  }, [visibleDays, containerWidth, timelineLength, timelineScale]);

  return (
    <TimelineSettingsContext.Provider
      value={{
        visibleDays,
        setVisibleDays,
        timelineStart,
        timelineEnd,
        timelineLength,
        timelineScale,
        setTimelineScale,
        prevTimelineScale,
        bookings,
        groupedBookings,
        calculatePercentage,
        dates,
        selectedBooking,
        setSelectedBooking,
        bookingDetailsOpen,
        setBookingDetailsOpen,
      }}
    >
      {children}
    </TimelineSettingsContext.Provider>
  );
};
