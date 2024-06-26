import { format, getDay, isToday } from "date-fns";

export default function DateColumn({ date, width }) {
  const dayOfWeek = getDay(date);
  const style = {
    width: `${width}%`,
  };
  const colors = `${
    isToday(date)
      ? "bg-today-header text-white"
      : dayOfWeek === 6 || dayOfWeek === 0
      ? "bg-weekend-header"
      : "bg-workday-header"
  }`;

  return (
    <div className="flex-none h-8" style={style}>
      <div
        className={`${colors} h-full border-r border-solid border-white text-center content-center text-sm font-medium`}
      >
        {format(date, "d")}
      </div>
    </div>
  );
}
