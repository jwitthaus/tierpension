import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { addDays, differenceInCalendarDays } from "date-fns";
import * as React from "react";

import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import BackgroundColumn from "./BackgroundColumn";
import styles from "./Timeline.module.css";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
}));

export default function Timeline(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );
  //% muss verwendet werden, um den zoom Faktoranzuzeigen (100% = ContainerBreite)
  //also 30 Tage auf 100% ist eine Monatsansicht und einem Monat an Daten.
  //Wenn man Buchungen für 2 Monate hat und man will aber nur einen Monat sehen, dann verwendet man 60 Tage bei 200%
  const zoom = (timelineLength / props.visibleDays) * 100 + "%";
  const [data, setData] = useState(props.data);

  return (
    //Für die Erzeugung des Grids ist es wichtig ein leeres grid vor den Balken zu legen,
    //dann ein grid für den Balken selbst
    //und wieder ein leeres grid für den kompletten Bereich hinter dem Balken bis zum Ende des charts. Nur so ist sicher gestellt, dass eine keine ungewollten Umbrüche gibt
    <Box
      sx={{ flexGrow: 1, width: zoom, transition: "width 0.5s" }}
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
        {data.map((category, i) => (
          <React.Fragment key={i}>
            <Grid
              item
              height="48px"
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
                    //den doppelten Aufruf der Funktion vermeiden
                    differenceInCalendarDays(
                      booking.dayStart,
                      props.timelineStart
                    ) >= 0
                      ? differenceInCalendarDays(
                          booking.dayStart,
                          props.timelineStart
                        )
                      : 0
                  }
                ></Grid>
                <Grid
                  item
                  height="48px"
                  xs={
                    // +1 da selbst wenn der Buchungstag = timelineStart ist (Differenz = 0), dann soll ja trotzdem ein Balken von einem Tag angezeigt werden
                    differenceInCalendarDays(
                      booking.dayStart,
                      props.timelineStart
                    ) >= 0
                      ? differenceInCalendarDays(
                          booking.dayEnd,
                          booking.dayStart
                        ) + 1
                      : differenceInCalendarDays(
                          booking.dayEnd,
                          props.timelineStart
                        ) + 1
                  }
                >
                  <Item elevation={2} onClick={handleClick}>
                    {
                      //als label verwende ich die originale Länge der Buchung, auch wenn ein Teil bereits in der Vergangenheit liegt
                      //--> mit Niklas klären
                      differenceInCalendarDays(
                        booking.dayEnd,
                        booking.dayStart
                      ) + 1
                      //der folgende code ist nur zu Testen um zu sehen, wiev lang der Block gezeichnet wird
                      /*differenceInCalendarDays(data[i].dayStart, timelineStart) >= 0
                      ? "booking " +
                        (differenceInCalendarDays(
                          data[i].dayEnd,
                          data[i].dayStart
                        ) +
                          1)
                      : "booking " +
                        (differenceInCalendarDays(data[i].dayEnd, timelineStart) + 1)*/
                    }
                    days
                  </Item>
                </Grid>
                <Grid
                  item
                  height="48px"
                  xs={
                    //-1 um den Tag von oben (+1) wieder auszugleichen
                    differenceInCalendarDays(
                      props.timelineEnd,
                      booking.dayEnd
                    ) - 1
                  }
                ></Grid>
              </React.Fragment>
            ))}
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
        disableScrollLock={true}
        transformOrigin={{ horizontal: 0, vertical: -4 }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}
