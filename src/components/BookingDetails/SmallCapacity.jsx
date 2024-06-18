import React from "react";
import styles from "../../Bookings/Capacity/Capacity.module.css";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import { differenceInCalendarDays } from "date-fns";

export default function SmallCapacity(props) {
  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );
  const [colors, setcolorBookings] = React.useState([
    "#f4f4f4",
    "#87EA32",
    "#FE5019",
  ]);
  return (
    <Box sx={{ width: "100%" }} className={styles.capacity}>
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        colors={colors}
        series={[
          {
            data: [3, 6, 6, 4, 5, 3, 6],
            stack: "A",
            label: "Booked",
          },
          {
            data: [3, 0, 0, 2, 1, 3, 0],
            stack: "A",
            label: "Free Capacity",
          },
          {
            data: [0, 1, 1, 0, 0, 0, 1],
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
