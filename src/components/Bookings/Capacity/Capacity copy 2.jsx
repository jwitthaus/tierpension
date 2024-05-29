import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Box } from "@mui/material";
import styles from "./Capacity.module.css";

const data = [
  -2, -2, -2, -2, -4, -4, -4, 1, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4,
  1, 1, 1, 1, -4, -4, -4,
];

const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
  "Page H",
  "Page I",
  "Page J",
  "Page K",
  "Page L",
  "Page M",
  "Page N",
  "Page O",
  "Page P",
  "Page Q",
  "Page R",
  "Page R",
  "Page T",
  "Page U",
  "Page V",
  "Page W",
  "Page X",
  "Page Y",
  "Page Z",
  "Page 1",
  "Page 2",
  "Page 3",
  "Page 4",
  "Page 5",
];

export default function Capacity(timelineDays) {
  const timelineLength = 30; //to be calculated from end of latest booking
  //% muss verwendet werden, um den zoom Faktoranzuzeigen (100% = ContainerBreite)
  //also 30 Tage auf 100% ist eine Monatsansicht und einem Monat an Daten.
  //Wenn man Buchungen für 2 Monate hat und man will aber nur einen Monat sehen, dann verwendet man 60 Tage bei 200%
  const zoom = (timelineLength / timelineDays.timelineDays) * 100 + "%";
  console.log("test " + zoom);
  return (
    <Box sx={{ width: zoom, height: "100px" }} className={styles.capacity}>
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        series={[
          {
            data: data,
          },
        ]}
        xAxis={[
          {
            data: xLabels,
            scaleType: "band",
            categoryGapRatio: 0.1,
          },
        ]}
        yAxis={[{ max: 4 }]}
        leftAxis={null}
        bottomAxis={null}
        slotProps={{ legend: { hidden: true } }}
      />
    </Box>
  );
}
