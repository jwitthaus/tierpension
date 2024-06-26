import { differenceInCalendarDays } from "date-fns";
import React, { useContext } from "react";
import BackgroundColumns from "./BackgroundColumns";
import BookingBar from "./BookingBar";
import { TimelineSettingsContext } from "./TimelineSettingsProvider";

const Timeline = () => {
  const { groupedBookings, calculatePercentage, dates, setSelectedBooking } =
    useContext(TimelineSettingsContext);

  function handleBookingSelected(booking) {
    setSelectedBooking(booking.LfdNr);
  }

  return (
    <div className="whitespace-nowrap relative">
      <div className="absolute flex w-full h-full">
        {dates.map((date, index) => {
          const { width } = calculatePercentage(new Date(), new Date());
          console.log("width background " + width);
          return (
            <BackgroundColumns
              key={index}
              date={date}
              width={width}
            ></BackgroundColumns>
          );
        })}
      </div>
      <div className="relative flex flex-col z-20 pt-8">
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
                    callbackBarClicked={() => handleBookingSelected(booking)}
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
    </div>
  );
};

export default Timeline;
