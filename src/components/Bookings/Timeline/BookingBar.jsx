import React from "react";
import styles from "./BookingBar.module.css";
import { Paper } from "@mui/material";

const BookingBar = ({ startPosition, width, label, callbackBarClicked }) => {
  const style = {
    left: `${startPosition}%`,
    width: `${width}%`,
  };

  return (
    <Paper className={styles.bar} style={style} onClick={callbackBarClicked}>
      {label}
    </Paper>
  );
};

export default BookingBar;
