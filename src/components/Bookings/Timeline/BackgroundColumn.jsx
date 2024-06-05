import React from "react";
import styles from "./BackgroundColumn.module.css";
import { isToday } from "date-fns";

export default function BackgroundColumn({ date }) {
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
    ></div>
  );
}
