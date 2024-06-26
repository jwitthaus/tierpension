import { useMediaQuery } from "@mui/material";
import axios from "axios";
import React, { useCallback, useContext, useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import BookingDetails from "../components/BookingDetails/BookingDetails.jsx";
import Capacity from "../components/Bookings/Capacity/Capacity";
import CustomerList from "../components/Bookings/CustomerList/CustomerList";
import DateColumn from "../components/Bookings/Timeline/DateColumn.jsx";
import Timeline from "../components/Bookings/Timeline/Timeline.jsx";
import { TimelineSettingsContext } from "../components/Bookings/Timeline/TimelineSettingsProvider.jsx";
import BookingsToolBar from "../components/Bookings/Toolbar/BookingsToolBar";

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
    dates,
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
  }, [data, setBookingDetailsOpen]);

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
    setSelectedBooking(booking.LfdNr);
  };

  const scrollToDateCallback = (booking) => {
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
  }, [queryClient, selectedBooking, setSelectedBooking, setBookingDetailsOpen]);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const listItemProps = {
    itemClickedCallback: isSmallScreen
      ? openBookingDetailsCallback
      : scrollToDateCallback,
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="w-full flex fixed bg-white z-30 pt-4">
          <div className="w-80">
            <BookingsToolBar />
          </div>
          <div ref={capacityRef} className="flex-1 w-full overflow-hidden">
            <Capacity
              startDate={timelineStart}
              endDate={timelineEnd}
              scale={timelineScale}
            />
            <div className="flex w-full">
              {dates.map((date, index) => {
                //date bar needs to be part of Capacity container to avoid scrolling out of view when scrolling down
                const { width } = calculatePercentage(new Date(), new Date());
                console.log("width date " + width);
                return (
                  <DateColumn
                    key={index}
                    date={date}
                    width={width}
                  ></DateColumn>
                );
              })}
            </div>
          </div>
        </div>
        <div className="w-full flex mt-28">
          <div className="w-80 pt-8">
            <CustomerList {...listItemProps} />
          </div>
          <div
            ref={timelineRef}
            className="flex-1 w-full overflow-x-scroll overflow-y-hidden bg-neutral-100"
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
