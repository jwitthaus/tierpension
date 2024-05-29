import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  addDays,
  differenceInCalendarDays,
  differenceInDays,
  format,
  parse,
} from "date-fns";
import * as React from "react";

import { useState } from "react";
import DayCircle from "./DayCircle";
import styles from "./MyTimeline.module.css";
import { Popover, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
}));

export default function MyTimeline() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  var intervalToDuration = require("date-fns/intervalToDuration");
  //Tage errechnen sich aus Tag der Rückgabe der spätesten Buchung - heutiges Datum (in Tagen)
  //--> vorausgesetzt man kann nicht in die Vergangenheit scrollen
  //diese Zahl wird dann als Spaltenzahl verwendet
  const timelineLength = 30; //to be calculated from end of latest booking
  const today = new Date(); //to be used for marking of taday column
  const timelineStart = today; //to be configurable from config file
  const endOfTimeline = addDays(today, timelineLength);
  const [data, setData] = useState([
    {
      //Niklas fragen, ob das bei ihm 15 ode 16 Tage sind? --> es sind zwar 16 Tage aber 15 Übernachtungen
      //Der Balken fängt am 2. an, aber wann soll er aufhören? Inklusive 8.?
      dayStart: new Date(2024, 4, 27),
      dayEnd: new Date(2024, 5, 1),
    },
    {
      dayStart: new Date(2024, 5, 12),
      dayEnd: new Date(2024, 5, 24),
    },
    {
      dayStart: new Date(2024, 5, 2),
      dayEnd: new Date(2024, 5, 8),
    },
    {
      dayStart: new Date(2024, 5, 12),
      dayEnd: new Date(2024, 5, 24),
    },
    {
      dayStart: new Date(2024, 5, 2),
      dayEnd: new Date(2024, 5, 8),
    },
    {
      dayStart: new Date(2024, 5, 12),
      dayEnd: new Date(2024, 5, 24),
    },
    {
      dayStart: new Date(2024, 5, 2),
      dayEnd: new Date(2024, 5, 8),
    },
    {
      dayStart: new Date(2024, 5, 12),
      dayEnd: new Date(2024, 5, 24),
    },
  ]);

  const dates = [
    new Date(2024, 6, 2),
    new Date(2024, 6, 8),
    new Date(2024, 7, 18),
  ];

  return (
    //cqw muss verwendet werden, um den zoom Faktoranzuzeigen (100cqw = ContainerBreite)
    //also 30 Tage auf 100cqw ist eine Monatsansicht und einem Monat an Daten.
    //Wenn man Buchungen für 2 Monate hat und man will aber nur einen Monat sehen, dann verwendet man 60 Tage bei 200cqw

    //Für die Erzeugung des Grids ist es wichtig ein leeres grid vor den Balken zu legen,
    //dann ein grid für den Balken selbst
    //und wieder ein leeres grid für den kompletten Bereich hinter dem Balken bis zum Ende des charts. Nur so ist sicher gestellt, dass eine keine ungewollten Umbrüche gibt
    <Box sx={{ flexGrow: 1, width: "200cqw" }} className={styles.container}>
      <div className={styles.dayColumns}>
        {new Array(timelineLength).fill(0).map((_, index) => (
          <DayCircle index={index} key={index} className={styles.day}>
            {format(addDays(new Date(), index), "d")}
          </DayCircle>
        ))}
      </div>
      <Grid
        container
        rowSpacing={1}
        columns={timelineLength}
        className={styles.gantt}
      >
        {data.map((d, i) => (
          <React.Fragment key={i}>
            <Grid
              item
              xs={
                //den doppelten Aufruf der Funktion vermeiden
                differenceInCalendarDays(data[i].dayStart, today) >= 0
                  ? differenceInCalendarDays(data[i].dayStart, today)
                  : 0
              }
            ></Grid>
            <Grid
              item
              xs={
                // +1 da selbst wenn der Buchungstag = today ist (Differenz = 0), dann soll ja trotzdem ein Balken von einem Tag angezeigt werden
                differenceInCalendarDays(data[i].dayStart, today) >= 0
                  ? differenceInCalendarDays(data[i].dayEnd, data[i].dayStart) +
                    1
                  : differenceInCalendarDays(data[i].dayEnd, today) + 1
              }
            >
              <Item elevation={2} onClick={handleClick}>
                {
                  //als label verwende ich die originale Länge der Buchung, auch wenn ein Teil bereits in der Vergangenheit liegt
                  //--> mit Niklas klären
                  differenceInCalendarDays(data[i].dayEnd, data[i].dayStart) + 1
                  //der folgende code ist nur zu Testen um zu sehen, wiev lang der Block gezeichnet wird
                  /*differenceInCalendarDays(data[i].dayStart, today) >= 0
                    ? "booking " +
                      (differenceInCalendarDays(
                        data[i].dayEnd,
                        data[i].dayStart
                      ) +
                        1)
                    : "booking " +
                      (differenceInCalendarDays(data[i].dayEnd, today) + 1)*/
                }
                days
              </Item>
            </Grid>
            <Grid
              item
              xs={
                //-1 um den Tag von oben (+1) wieder auszugleichen
                differenceInCalendarDays(endOfTimeline, data[i].dayEnd) - 1
              }
            ></Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Popover
        elevation={4}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{ vertical: -4 }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}
