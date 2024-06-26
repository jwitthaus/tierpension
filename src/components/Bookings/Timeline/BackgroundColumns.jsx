import { getDay, isToday } from "date-fns";
import React from "react";

export default function BackgroundColumn({ date, width }) {
  const dayOfWeek = getDay(date);
  const style = {
    width: `${width}%`,
  };
  const colors = `${
    isToday(date)
      ? "bg-today-column"
      : dayOfWeek === 6 || dayOfWeek === 0
      ? "bg-weekend-column"
      : "bg-neutral-100"
  }`;
  return (
    <div className="flex-none flex flex-col" style={style}>
      <div
        className={`${colors} h-full border-r border-solid border-white`}
      ></div>
    </div>
  );
}
