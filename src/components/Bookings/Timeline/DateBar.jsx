import React from "react";

import styles from "./Timeline.module.css";
import DateBarColumn from "./DateBarColumn";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Box } from "@mui/material";

export default function DateBar(props) {
  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );
  const zoom = (timelineLength / props.visibleDays) * 100 + "%";
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: zoom,
        transition: "width 0.5s",
        backgroundColor: "#e4e4e4",
      }}
      className={styles.container}
      height={25}
    >
      <div className={styles.dayColumns}>
        {new Array(timelineLength).fill(0).map((_, index) => (
          <DateBarColumn
            date={addDays(props.timelineStart, index)}
            key={index}
          ></DateBarColumn>
        ))}
      </div>
    </Box>
  );
}
