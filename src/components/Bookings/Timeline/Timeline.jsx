import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import * as React from "react";
import { animate, motion } from "framer-motion";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import BackgroundColumn from "./BackgroundColumn";
import styles from "./Timeline.module.css";
import { Context } from "../../../pages/Bookings";
import { useEffect } from "react";
import { useContext } from "react";
import { useRef } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  paddingInlineStart: "16px",
  color: theme.palette.text.secondary,
  borderRadius: "8px",
}));

export default function Timeline(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );

  const timelineRef = useRef(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const AnimatedBox = motion(Box);

  return (
    //Für die Erzeugung des Grids ist es wichtig ein leeres grid vor den Balken zu legen,
    //dann ein grid für den Balken selbst
    //und wieder ein leeres grid für den kompletten Bereich hinter dem Balken bis zum Ende des charts. Nur so ist sicher gestellt, dass eine keine ungewollten Umbrüche gibt
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
        {props.data.map((category, i) => (
          <React.Fragment key={i}>
            <Grid
              item
              height="30px"
              xs={differenceInCalendarDays(
                props.timelineEnd,
                props.timelineStart
              )}
            ></Grid>
            {category.bookings.map((booking, j) => {
              //actual rows for bantt bars
              const startDate = format(
                parseISO(booking.Beginn_Datum),
                "eeee do MMM, yyyy"
              );
              const endDate = format(
                parseISO(booking.Ende_Datum),
                "eeee do MMM, yyyy"
              );
              return (
                <React.Fragment key={j}>
                  <Grid
                    item
                    height="48px"
                    xs={
                      //den doppelten Aufruf der Funktion vermeiden
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
                      // +1 da selbst wenn der Buchungstag = timelineStart ist (Differenz = 0), dann soll ja trotzdem ein Balken von einem Tag angezeigt werden
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
                      onClick={handleClick}
                      key={booking.id}
                      sx={{ height: "36px", marginTop: "6px" }}
                    >
                      {
                        //als label verwende ich die originale Länge der Buchung, auch wenn ein Teil bereits in der Vergangenheit liegt
                        //--> mit Niklas klären
                        differenceInCalendarDays(
                          new Date(booking.Ende_Datum),
                          new Date(booking.Beginn_Datum)
                        ) + 1
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
                        new Date(booking.Ende_Datum)
                      ) - 1
                    }
                  ></Grid>
                </React.Fragment>
              );
            })}
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
