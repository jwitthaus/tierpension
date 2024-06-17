import React from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addMinutes } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Button,
  ButtonGroup,
  Container,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { de } from "date-fns/locale";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const locales = {
  de: de,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  allDay: "ganztags",
  previous: "Letzter",
  next: "Nächster",
  today: "heute",
  month: "Monat",
  week: "Woche",
  day: "Tag",
  agenda: "Agenda",
  date: "Datum",
  time: "Zeit",
  event: "Termin",
};

const startDate = new Date();

const events = [
  {
    title: "Meeting",
    start: new Date(2024, 6, 3, 10, 0),
    end: new Date(2024, 6, 3, 12, 0),
  },
];

function CustomToolbar() {
  return (
    <div className="toolbar-container">
      <div className="back-next-buttons">
        <button className="btn btn-back">
          <ChevronLeftIcon />
        </button>
        <label className="label-date">Aug-Sept 2016</label>
      </div>

      <div className="filter-container">
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <ToggleButton value="Month">Web</ToggleButton>
          <ToggleButton value="android">Android</ToggleButton>
          <ToggleButton value="ios">iOS</ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
}

const CalendarPage = (props) => {
  const appointments = props.data?.flatMap((event) => [
    {
      id: `${event.LfdNr}_start`,
      start: new Date(event.Beginn_Start),
      end: addMinutes(new Date(event.Beginn_Start), event.Beginn_Zeitraum),
      title: event.NameIntern,
    },
    {
      id: `${event.LfdNr}_end`,
      start: new Date(event.Ende_Start),
      end: addMinutes(new Date(event.Ende_Start), event.Ende_Zeitraum),
      title: event.NameIntern,
    },
  ]);
  console.log(appointments);

  return (
    <Container sx={{ height: "80%" }}>
      <Calendar
        localizer={localizer}
        events={appointments}
        startCcessor="start"
        endAccessor="end"
        culture="de"
        messages={messages}
      />
    </Container>
  );
};

export default CalendarPage;
