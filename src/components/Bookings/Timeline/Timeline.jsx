import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { addDays, differenceInCalendarDays } from "date-fns";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import BookingDetails from "../../BookingDetails/BookingDetails";
import BackgroundColumn from "./BackgroundColumn";
import styles from "./Timeline.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  paddingInlineStart: "16px",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
}));

const fetchBookingData = async (bookingID) => {
  const response = await axios.get(
    `http://localhost:8081/booking?LfdNr=${bookingID}`
  );
  return response.data;
};

export default function Timeline(props) {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["booking", selectedBooking],
    () => fetchBookingData(selectedBooking),
    {
      enabled: !!selectedBooking, // Die Abfrage wird nur ausgeführt, wenn eine `bookingID` ausgewählt wurde
    }
  );

  const handleBookingClose = useCallback(() => {
    setSelectedBooking(null);
    setBookingDetailsOpen(false);
    queryClient.invalidateQueries(["booking", selectedBooking]);
  }, [queryClient, selectedBooking]);

  useEffect(() => {
    if (data) {
      setBookingDetailsOpen(true); // Öffne das Detailfenster, wenn Daten geladen wurden
    }
  }, [data]);

  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );

  const timelineRef = useRef(null);

  return (
    <Box
      ref={timelineRef}
      sx={{
        flexGrow: 1,
        width: `${props.timelineScale}%`,
      }}
      className={styles.container}
    >
      <div className={styles.dayColumns}>
        {new Array(timelineLength).fill(0).map((_, index) => (
          <BackgroundColumn
            date={addDays(props.timelineStart, index)}
            key={index}
          ></BackgroundColumn>
        ))}
      </div>
      <Grid container columns={timelineLength} className={styles.gantt}>
        {props.data?.map((category, i) => (
          <React.Fragment key={i}>
            <Grid
              item
              height="30px"
              xs={differenceInCalendarDays(
                props.timelineEnd,
                props.timelineStart
              )}
            ></Grid>
            {category.bookings.map((booking, j) => (
              <React.Fragment key={j}>
                <Grid
                  item
                  height="48px"
                  xs={
                    differenceInCalendarDays(
                      new Date(booking.Beginn_Datum),
                      props.timelineStart
                    ) >= 0
                      ? differenceInCalendarDays(
                          new Date(booking.Beginn_Datum),
                          props.timelineStart
                        )
                      : 0
                  }
                ></Grid>
                <Grid
                  item
                  height="48px"
                  xs={
                    differenceInCalendarDays(
                      new Date(booking.Beginn_Datum),
                      props.timelineStart
                    ) >= 0
                      ? differenceInCalendarDays(
                          new Date(booking.Ende_Datum),
                          new Date(booking.Beginn_Datum)
                        ) + 1
                      : differenceInCalendarDays(
                          new Date(booking.Ende_Datum),
                          props.timelineStart
                        ) + 1
                  }
                >
                  <Item
                    elevation={2}
                    onClick={() => setSelectedBooking(booking.LfdNr)}
                    key={booking.LfdNr}
                    sx={{ height: "36px", marginTop: "6px" }}
                  >
                    {differenceInCalendarDays(
                      new Date(booking.Ende_Datum),
                      new Date(booking.Beginn_Datum)
                    ) + 1}{" "}
                    days
                  </Item>
                </Grid>
                <Grid
                  item
                  height="48px"
                  xs={
                    differenceInCalendarDays(
                      props.timelineEnd,
                      new Date(booking.Ende_Datum)
                    ) - 1
                  }
                ></Grid>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
      </Grid>
      <BookingDetails
        visible={bookingDetailsOpen}
        callbackClose={handleBookingClose}
        selectedBooking={data?.[0]}
      />
    </Box>
  );
}
