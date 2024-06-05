import React from "react";
import styles from "./DateBarColumn.module.css";
import { format, isToday } from "date-fns";

export default function DateBarColumn({ date }) {
  let dayOfWeek = date.getDay();
  return (
    <div
      className={
        isToday(date)
          ? styles.today
          : dayOfWeek === 6 || dayOfWeek === 0
          ? styles.weekend
          : styles.workday
      }
    >
      {format(date, "d")}
    </div>
  );
}
