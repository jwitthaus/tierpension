import React from "react";
import styles from "./Capacity.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import { differenceInCalendarDays } from "date-fns";

export default function Capacity(props) {
  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );
  //% muss verwendet werden, um den zoom Faktoranzuzeigen (100% = ContainerBreite)
  //also 30 Tage auf 100% ist eine Monatsansicht und einem Monat an Daten.
  //Wenn man Buchungen für 2 Monate hat und man will aber nur einen Monat sehen, dann verwendet man 60 Tage bei 200%
  const zoom = (timelineLength / props.visibleDays) * 100 + "%";
  const [colors, setcolorBookings] = React.useState([
    "#f4f4f4",
    "#87EA32",
    "#FE5019",
  ]);
  return (
    <Box sx={{ width: zoom }} className={styles.capacity}>
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        colors={colors}
        series={[
          {
            data: [
              3, 6, 6, 4, 5, 3, 6, 6, 4, 5, 3, 6, 6, 4, 5, 3, 6, 6, 4, 5, 3, 6,
              6, 4, 5, 3, 6, 6, 4, 4,
            ],
            stack: "A",
            label: "Booked",
          },
          {
            data: [
              3, 0, 0, 2, 1, 3, 0, 0, 2, 1, 3, 0, 0, 2, 1, 3, 0, 0, 2, 1, 3, 0,
              0, 2, 1, 3, 0, 0, 2, 2,
            ],
            stack: "A",
            label: "Free Capacity",
          },
          {
            data: [
              0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
              1, 0, 0, 0, 1, 1, 0, 0,
            ],
            stack: "A",
            label: "Overbooked",
          },
        ]}
        leftAxis={null}
        bottomAxis={null}
        slotProps={{ legend: { hidden: true } }}
      />
    </Box>
  );
}
