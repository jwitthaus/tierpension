import { Paper } from "@mui/material";
import React from "react";

const BookingBar = ({ startPosition, width, label, callbackBarClicked }) => {
  const style = {
    left: `${startPosition}%`,
    width: `${width}%`,
  };

  return (
    <div className="py-1 h-12">
      <Paper
        className="relative h-full flex flex-col justify-center pl-4"
        style={style}
        onClick={callbackBarClicked}
      >
        {label}
      </Paper>
    </div>
  );
};

export default BookingBar;
