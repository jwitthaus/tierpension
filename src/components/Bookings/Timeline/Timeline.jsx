import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import BookingDetails from "../../BookingDetails/BookingDetails";
import BackgroundColumns from "./BackgroundColumns";
import BookingBar from "./BookingBar";
import styles from "./Timeline.module.css";
import { TimelineSettingsContext } from "./TimelineSettingsProvider";

const Timeline = () => {
  const {
    groupedBookings,
    calculatePercentage,
    dates,
    selectedBooking,
    setSelectedBooking,
  } = useContext(TimelineSettingsContext);

  const queryClient = useQueryClient();
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);

  const fetchBookingData = async (bookingID) => {
    const response = await axios.get(
      `http://localhost:8081/booking?LfdNr=${bookingID}`
    );
    return response.data;
  };

  function handleBookingSelected(booking) {
    setSelectedBooking(booking);
  }

  const handleBookingClose = useCallback(() => {
    setSelectedBooking(null);
    setBookingDetailsOpen(false);
    queryClient.invalidateQueries(["booking", selectedBooking]);
  }, [queryClient, selectedBooking, setSelectedBooking]);

  useEffect(() => {
    if (selectedBooking) {
      console.log(selectedBooking);
    }
  }, [selectedBooking]);

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

  return (
    <div className={styles.barChartContainer}>
      <div className={styles.dayColumns}>
        {dates.map((date, index) => {
          const { width } = calculatePercentage(new Date(), new Date());
          return (
            <BackgroundColumns
              key={index}
              date={date}
              width={width}
            ></BackgroundColumns>
          );
        })}
      </div>
      <div className={styles.barChart}>
        {groupedBookings.map((category, index) => {
          return (
            <React.Fragment key={index}>
              <div
                key={`${index}`} // Verwenden Sie eine eindeutige Kombination aus index und idx für den key
                style={{ height: "30px" }}
              />
              {category.bookings.map((booking, idx) => {
                const { startPosition, width } = calculatePercentage(
                  new Date(booking.Beginn_Datum),
                  new Date(booking.Ende_Datum)
                );
                const bookingLength =
                  differenceInCalendarDays(
                    booking.Ende_Datum,
                    booking.Beginn_Datum
                  ) + 1;

                return (
                  <BookingBar
                    callbackBarClicked={() =>
                      handleBookingSelected(booking.LfdNr)
                    }
                    key={booking.LfdNr} // Verwenden Sie eine eindeutige Kombination aus index und idx für den key
                    startPosition={startPosition}
                    width={width}
                    index={index}
                    label={`${bookingLength} ${
                      bookingLength > 1 ? "days" : "day"
                    }`}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <BookingDetails
        visible={bookingDetailsOpen}
        callbackClose={handleBookingClose}
        selectedBooking={data?.[0]}
      />
    </div>
  );
};

export default Timeline;
