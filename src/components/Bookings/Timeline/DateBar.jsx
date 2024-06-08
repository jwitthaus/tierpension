import React from "react";

import styles from "./Timeline.module.css";
import DateBarColumn from "./DateBarColumn";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function DateBar(props) {
  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );

  const AnimatedBox = motion(Box);

  const zoom = (timelineLength / props.visibleDays) * 100 + "%";
  return (
    <AnimatedBox
      sx={{
        flexGrow: 1,
        backgroundColor: "#e4e4e4",
      }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      animate={{ width: zoom }}
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
    </AnimatedBox>
  );
}
