import { Box, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { animate } from "framer-motion";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../../../pages/Bookings";
import styles from "./Capacity.module.css";

const CustomItemTooltipContent = (props) => {
  const { itemData, series } = props;
  return (
    <Paper sx={{ padding: 3, backgroundColor: series.color }}>
      <p>{series.label}</p>
      <p>{series.data[itemData.dataIndex]}</p>
    </Paper>
  );
};

export default function Capacity(props) {
  const capacity = [6, 6, 6, 6, 6, 6];
  const bookings = [5, 6, 7, 8, 4, 3];
  /*const capacity = [
    ...Array(differenceInCalendarDays(props.timelineEnd, props.timelineStart)),
  ].map((d, i) => 6);

  const bookings = [
    ...Array(differenceInCalendarDays(props.timelineEnd, props.timelineStart)),
  ].map((d, i) => Math.floor(Math.random() * (8 - 3 + 1)) + 3);*/

  const greyBar = [
    ...capacity.map((d, i) => (d < bookings[i] ? d : bookings[i])),
  ];
  const greenBar = [...capacity.map((d, i) => Math.max(0, d - bookings[i]))];
  const redBar = [...capacity.map((d, i) => Math.max(0, bookings[i] - d))];
  /*console.log("grey: " + greyBar);
  console.log("red: " + redBar);
  console.log("green: " + greenBar);*/

  const timelineLength = differenceInCalendarDays(
    props.timelineEnd,
    props.timelineStart
  );
  const capacityRef = useRef(null);

  const [colors, setcolorBookings] = React.useState([
    "#f4f4f4",
    "#87EA32",
    "#FE5019",
  ]);
  return (
    <Box
      ref={capacityRef}
      className={styles.capacity}
      sx={{ width: `${props.timelineScale}%` }}
    >
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        colors={colors}
        //tooltip={{ trigger: "item", itemContent: CustomItemTooltipContent }}
        tooltip={{ trigger: "item" }}
        xAxis={[
          {
            data: [
              ...Array(
                differenceInCalendarDays(props.timelineEnd, props.timelineStart)
              ),
            ].map((d, i) =>
              format(addDays(props.timelineStart, i), "d. MMMM yy")
            ),
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: greyBar,
            stack: "A",
            label: "Overall Booked",
            valueFormatter: (element, { dataIndex }) =>
              `${element + redBar[dataIndex]}`,
          },
          {
            data: greenBar,
            stack: "A",
            label: "Free Capacity",
          },
          {
            data: redBar,
            stack: "A",
            label: "Overbooked",
          },
        ]}
        leftAxis={null}
        bottomAxis={null}
        slotProps={{ legend: { hidden: true } }}
        slots={{
          itemContent: CustomItemTooltipContent,
        }}
      />
    </Box>
  );
}
