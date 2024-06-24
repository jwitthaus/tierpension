import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { BarChart } from "@mui/x-charts/BarChart";

const barChartsParams = {
  xAxis: [
    {
      data: ["page A", "page B", "page C", "page D", "page E"],
      scaleType: "band",
    },
  ],
  series: [
    { data: [2, 5, 3, 4, 1], stack: "1", label: "series x" },
    { data: [10, 3, 1, 2, 10], stack: "1", label: "series y" },
    { data: [10, 3, 1, 2, 10], stack: "1", label: "series z" },
  ],
  margin: { top: 10, right: 10 },
  height: 200,
};

const CustomItemTooltipContent = (props) => {
  const { itemData, series } = props;
  console.log(series);
  return (
    <Paper sx={{ padding: 3, backgroundColor: series.color }}>
      <p>{series.label}</p>
      <p>{series.data[itemData.dataIndex]}</p>
    </Paper>
  );
};
export default function BarChartTest() {
  return (
    <Stack direction="column" sx={{ width: "100%", maxWidth: 400 }}>
      <BarChart
        {...barChartsParams}
        tooltip={{ trigger: "axis", axisContent: CustomItemTooltipContent }}
      />
    </Stack>
  );
}
