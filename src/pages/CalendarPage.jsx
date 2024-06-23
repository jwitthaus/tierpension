import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import {
  addDays,
  addMinutes,
  addMonths,
  addWeeks,
  endOfWeek,
  format,
  getDay,
  parse,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { de } from "date-fns/locale";
import React, { useCallback, useContext, useMemo, useState } from "react";
import { Calendar, Views, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { TimelineSettingsContext } from "../components/Bookings/Timeline/TimelineSettingsProvider";

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

const VIEW_OPTIONS = [
  { id: Views.MONTH, label: "Month" },
  { id: Views.WEEK, label: "Week" },
  { id: Views.DAY, label: "Day" },
  { id: Views.AGENDA, label: "Agenda" },
];

const CalendarPage = (props) => {
  const { bookings } = useContext(TimelineSettingsContext);

  const [view, setView] = useState(Views.WEEK);
  const [date, setDate] = useState(new Date());

  const onPrevClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(subDays(date, 1));
    } else if (view === Views.WEEK) {
      setDate(subWeeks(date, 1));
    } else {
      setDate(subMonths(date, 1));
    }
  }, [view, date]);

  const onNextClick = useCallback(() => {
    if (view === Views.DAY) {
      setDate(addDays(date, 1));
    } else if (view === Views.WEEK) {
      setDate(addWeeks(date, 1));
    } else {
      setDate(addMonths(date, 1));
    }
  }, [view, date]);

  const onTodayClick = useCallback(() => {
    setDate(new Date());
  }, []);

  const dateText = useMemo(() => {
    if (view === Views.DAY) return format(date, "iiii, MMMM dd");
    if (view === Views.WEEK) {
      const from = startOfWeek(date);
      const to = endOfWeek(date);
      return `${format(from, "MMMM dd")} to ${format(to, "MMMM dd")}`;
    }
    if (view === Views.MONTH) {
      return format(date, "MMMM yyyy");
    }
    if (view === Views.AGENDA) {
      const from = date;
      const to = subDays(addMonths(date, 1), 1);
      return `${format(from, "MMMM dd")} to ${format(to, "MMMM dd")}`;
    }
  }, [view, date]);

  const appointments = (bookings ?? []).flatMap((event) => [
    {
      id: `${event.LfdNr}_start`,
      start: new Date(event.Beginn_Start),
      end: addMinutes(new Date(event.Beginn_Start), event.Beginn_Zeitraum),
      title: event.NameIntern,
      bgColor: "#243380",
      appType: "booking",
    },
    {
      id: `${event.LfdNr}_end`,
      start: new Date(event.Ende_Start),
      end: addMinutes(new Date(event.Ende_Start), event.Ende_Zeitraum),
      title: event.NameIntern,
      bgColor: "#243380",
      appType: "booking",
    },
  ]);

  (props.holidays ?? []).map((event) => {
    let obj = {};
    obj.start = new Date(event.Termin);
    obj.end = addDays(obj.start, 1);
    obj.title = event.Bemerkung ? event.Bemerkung : "holiday";
    obj.bgColor = "#fce2a6";
    obj.color = "#243380";
    obj.appType = "holiday";
    appointments.push(obj);

    return obj;
  });

  return (
    <Container sx={{ height: "80%" }}>
      <Box sx={{ display: "flex", marginY: 2 }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
          }}
        >
          <Button
            variant="outlined"
            sx={{ paddingY: 1 }}
            onClick={onTodayClick}
          >
            today
          </Button>
          <Box sx={{ display: "flex", marginX: 2 }}>
            <IconButton
              sx={{ height: "40px", width: "40px" }}
              onClick={onPrevClick}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              sx={{ height: "40px", width: "40px" }}
              onClick={onNextClick}
            >
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography sx={{ marginX: 2 }}>{dateText}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <ButtonGroup gap={0} spacing={0} isattached="true">
            {VIEW_OPTIONS.map(({ id, label }) => (
              <Button
                key={id}
                onClick={() => setView(id)}
                sx={
                  id === view
                    ? {
                        backgroundColor: "#EDF6FF",
                        "&:hover": {
                          backgroundColor: "#D7E6F3",
                        },
                      }
                    : {}
                }
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>

      <Calendar
        selectable
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        culture="de"
        view={view}
        onView={setView}
        messages={messages}
        toolbar={false}
        date={date}
        onNavigate={setDate}
        eventPropGetter={(appointments) => {
          const backgroundColor = appointments.bgColor
            ? appointments.bgColor
            : "blue";
          const color = appointments.color ? appointments.color : "white";
          return { style: { color, backgroundColor } };
        }}
        onSelectEvent={(event) =>
          event.appType === "booking" ? alert(event.title + event.start) : null
        }
        //onView={handleViewChange}
      />
    </Container>
  );
};

export default CalendarPage;
