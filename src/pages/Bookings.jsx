import { useMediaQuery } from "@mui/material";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import BookingDetails from "../components/BookingDetails/BookingDetails.jsx";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import Timeline from "../components/Bookings/Timeline/Timeline.jsx";
import { TimelineSettingsContext } from "../components/Bookings/Timeline/TimelineSettingsProvider.jsx";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";
import styles from "./Bookings.module.css";
import axios from "axios";

export default function Bookings() {
  const {
    timelineScale,
    prevTimelineScale,
    timelineStart,
    timelineEnd,
    calculatePercentage,
    bookingDetailsOpen,
    setBookingDetailsOpen,
    setSelectedBooking,
    selectedBooking,
  } = useContext(TimelineSettingsContext);

  const queryClient = useQueryClient();

  const fetchBookingData = async (bookingID) => {
    const response = await axios.get(
      `http://localhost:8081/booking?LfdNr=${bookingID}`
    );
    return response.data;
  };

  const { data } = useQuery(
    ["booking", selectedBooking],
    () => fetchBookingData(selectedBooking),
    {
      enabled: !!selectedBooking, // Die Abfrage wird nur ausgeführt, wenn eine `bookingID` ausgewählt wurde
    }
  );

  useEffect(() => {
    if (data) {
      setBookingDetailsOpen(true); // Öffne das Detailfenster, wenn Daten geladen wurden
    }
  }, [data]);

  const capacityRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const scrollPosition =
      (timelineRef.current.scrollLeft * timelineScale) / prevTimelineScale;
    timelineRef.current.scrollLeft = scrollPosition;
  }, [timelineScale, prevTimelineScale]);

  const handleScrollTimeline = (scroll) => {
    capacityRef.current.scrollLeft = scroll.target.scrollLeft;
  };

  const openBookingDetailsCallback = (booking) => {
    console.log("open details");
    setSelectedBooking(booking.LfdNr);
  };

  const scrollToDateCallback = (booking) => {
    console.log("scroll to date");
    const date = new Date(booking.Beginn_Datum);
    const { startPosition } = calculatePercentage(date, timelineStart); //position in %
    const scrollPosition =
      (startPosition * timelineRef.current?.offsetWidth) / 100;

    timelineRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  const handleBookingDetailsClose = useCallback(() => {
    setSelectedBooking(null);
    setBookingDetailsOpen(false);
    queryClient.invalidateQueries(["booking", selectedBooking]);
  }, [queryClient, selectedBooking, setSelectedBooking]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const listItemProps = {
    itemClickedCallback: isSmallScreen
      ? openBookingDetailsCallback
      : scrollToDateCallback,
  };

  useEffect(() => {
    console.log(isSmallScreen);
  }, [isSmallScreen]);

  return (
    <>
      <div className={styles.bookings}>
        <div className={styles.toparea}>
          <div className={styles.toolbar}>
            <BookingsToolBar />
          </div>
          <div ref={capacityRef} className={styles.capacity}>
            <Capacity
              startDate={timelineStart}
              endDate={timelineEnd}
              scale={timelineScale}
            />
          </div>
        </div>
        <div className={styles.bottomarea}>
          <div className={styles.customerList}>
            <CustomerList {...listItemProps} />
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
      <BookingDetails
        visible={bookingDetailsOpen}
        callbackClose={handleBookingDetailsClose}
        selectedBooking={data?.[0]}
      />
    </>
  );
}
