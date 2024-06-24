import { Box, Paper } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  addDays,
  endOfDay,
  startOfDay,
  subDays,
  differenceInCalendarDays,
  format,
  isWithinInterval,
} from "date-fns";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TimelineSettingsContext } from "../Timeline/TimelineSettingsProvider";
import styles from "./Capacity.module.css";
import { CapacityContext } from "./CapacityProvider";

const CustomItemTooltipContent = (props) => {
  const { itemData, series } = props;
  return (
    <Paper sx={{ padding: 3, backgroundColor: series.color }}>
      <p>{series.label}</p>
      <p>{series.data[itemData.dataIndex]}</p>
    </Paper>
  );
};

export default function Capacity({ startDate, endDate, scale }) {
  const { bookings } = useContext(TimelineSettingsContext);
  const [capacityLength, setCapacityLength] = useState(
    differenceInCalendarDays(endDate, startDate)
  );

  const getCapacityData = () => {
    const bookingCountData = [];
    const capacityCountData = [];

    for (let i = 0; i < capacityLength; i++) {
      let bookingCounter = 0;
      bookings?.forEach((booking) => {
        const day = addDays(startDate, i);
        const bookingStart = startOfDay(new Date(booking.Beginn_Datum));
        const bookingEnd = endOfDay(new Date(booking.Ende_Datum)); //+1 because a booking starting and ending at the same day has length of 1

        //ich muss hier mit aufpassen mit den Uhrzeiten
        //--> welche Uhrzeit hat date?
        //Liegt die auf jeden Fall immer dazwischen?
        if (isWithinInterval(day, { start: bookingStart, end: bookingEnd })) {
          bookingCounter++;
        }
      });
      let capacityCounter = 5;

      bookingCountData.push(bookingCounter);
      capacityCountData.push(capacityCounter);
    }

    return { bookingCountData, capacityCountData };
  };
  const { capacityCountData, bookingCountData } = getCapacityData(
    startDate,
    endDate
  );

  useEffect(() => {
    setCapacityLength(differenceInCalendarDays(endDate, startDate));
  }, [startDate, endDate]);

  const greyBar = [
    ...capacityCountData.map((d, i) =>
      d < bookingCountData[i] ? d : bookingCountData[i]
    ),
  ];
  const greenBar = [
    ...capacityCountData.map((d, i) => Math.max(0, d - bookingCountData[i])),
  ];
  const redBar = [
    ...capacityCountData.map((d, i) => Math.max(0, bookingCountData[i] - d)),
  ];

  const capacityRef = useRef(null);

  const [colors] = React.useState(["#f4f4f4", "#87EA32", "#FE5019"]);
  return (
    <Box
      ref={capacityRef}
      className={styles.capacity}
      sx={{ width: `${scale}%` }}
    >
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        colors={colors}
        //tooltip={{ trigger: "item", itemContent: CustomItemTooltipContent }}
        tooltip={{ trigger: "item" }}
        xAxis={[
          {
            data: [...Array(capacityLength)].map((d, i) =>
              format(addDays(startDate, i), "d. MMMM yy")
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
