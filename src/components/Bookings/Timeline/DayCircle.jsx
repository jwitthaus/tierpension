import React from "react";
import styles from "./DayCircle.module.css";

export default function DayCircle({ type, index, children }) {
  return (
    <div className={index % 2 === 0 ? styles.even : styles.odd}>{children}</div>
  );
}
