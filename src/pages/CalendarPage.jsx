import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container } from "@mui/material";

const localizer = momentLocalizer(moment);
const startDate = new Date();
//const endDate = startDate.add(moment.duration(2, 'hours'))

const events = [
  {
    title: "Meeting",
    start: new Date(2024, 6, 3, 10, 0),
    end: new Date(2024, 6, 3, 12, 0),
  },
];

const CalendarPage = () => {
  return (
    <Container sx={{ height: "80%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startCcessor="start"
        endAccessor="end"
      />
    </Container>
  );
};

export default CalendarPage;
