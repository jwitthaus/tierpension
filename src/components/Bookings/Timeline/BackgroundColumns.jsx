import React from "react";
import styles from "./BackgroundColumns.module.css";
import { format, getDay, isToday } from "date-fns";

export default function BackgroundColumn({ date, width }) {
  const dayOfWeek = getDay(date);
  const style = {
    width: `${width}%`,
    flex: "none",
    display: "flex",
    flexDirection: "column",
  };
  return (
    <div style={style}>
      <div
        className={
          isToday(date)
            ? styles.headerToday
            : dayOfWeek === 6 || dayOfWeek === 0
            ? styles.headerWeekend
            : styles.headerWorkday
        }
        style={{ height: "30px" }}
      >
        {format(date, "d")}
      </div>
      <div
        className={
          isToday(date)
            ? styles.today
            : dayOfWeek === 6 || dayOfWeek === 0
            ? styles.weekend
            : styles.workday
        }
      ></div>
    </div>
  );
}
