import React from "react";
import styles from "./Capacity.module.css";
import { BarChart } from "@mui/x-charts/BarChart";

const Capacity = () => {
  return (
    <div className={styles.capacity}>
      <BarChart
        margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        series={[
          {
            data: [
              3, 6, 6, 4, 5, 3, 6, 6, 4, 5, 3, 6, 6, 4, 5, 3, 6, 6, 4, 5, 3, 6,
              6, 4, 5, 3, 6, 6, 4,
            ],
            stack: "A",
            label: "Booked",
          },
          {
            data: [
              3, 0, 0, 2, 1, 3, 0, 0, 2, 1, 3, 0, 0, 2, 1, 3, 0, 0, 2, 1, 3, 0,
              0, 2, 1, 3, 0, 0, 2,
            ],
            stack: "A",
            label: "Free Capacity",
          },
          {
            data: [
              0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1,
              1, 0, 0, 0, 1, 1, 0,
            ],
            stack: "A",
            label: "Overbooked",
          },
        ]}
        leftAxis={null}
        bottomAxis={null}
        slotProps={{ legend: { hidden: true } }}
      />
    </div>
  );
};

export default Capacity;
