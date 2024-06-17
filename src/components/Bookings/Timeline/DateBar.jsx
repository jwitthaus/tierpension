import React from "react";

import { Box } from "@mui/material";
import { addDays, differenceInCalendarDays } from "date-fns";
import DateBarColumn from "./DateBarColumn";
import styles from "./Timeline.module.css";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../../pages/Bookings";
import { animate } from "framer-motion";
import { useEffect } from "react";

export default function DateBar(props) {
  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );

  const dateRef = useRef(null);

  return (
    <Box
      ref={dateRef}
      sx={{
        flexGrow: 1,
        backgroundColor: "#e4e4e4",
        width: `${props.timelineScale}%`,
      }}
      className={styles.container}
      height={25}
    >
      <div className={styles.dayColumns}>
        {new Array(timelineLength).fill(0).map((_, index) => {
          //console.log(index);
          return (
            <DateBarColumn
              date={addDays(props.timelineStart, index)}
              key={index}
            />
          );
        })}
      </div>
    </Box>
  );
}
