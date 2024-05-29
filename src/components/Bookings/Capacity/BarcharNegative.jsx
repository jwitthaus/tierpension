import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarchartNegative = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "Cash Flow",
        data: [
          2, 2, 3, 1, 1, 0, -1, -1, -2, -3, -3, -2, -1, -1, 0, 2, 2, 2, 2, 1, 0,
          0, -2, -2, -3, -3, -4, -2, -1, 1,
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 200,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 2,
                to: 100,
                color: "#F15B46",
              },
              {
                from: 0,
                to: 1,
                color: "#FEB019",
              },
              {
                from: -100,
                to: -1,
                color: "#87EA32",
              },
            ],
          },
          columnWidth: "80%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        show: false,
        title: {
          text: "Growth",
        },
        labels: {
          formatter: function (y) {
            return y.toFixed(0) + "%";
          },
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2024-02-27",
          "2024-02-28",
          "2024-02-29",
          "2024-02-30",
          "2024-03-01",
          "2024-03-02",
          "2024-03-03",
          "2024-03-04",
          "2024-03-05",
          "2024-03-06",
          "2024-03-07",
          "2024-03-08",
          "2024-03-09",
          "2024-03-10",
          "2024-03-11",
          "2024-03-12",
          "2024-03-13",
          "2024-03-14",
          "2024-03-15",
          "2024-03-16",
          "2024-03-17",
          "2024-03-18",
          "2024-03-19",
          "2024-03-20",
          "2024-03-21",
          "2024-03-22",
          "2024-03-23",
          "2024-03-24",
          "2024-03-25",
          "2024-03-26",
        ],
        labels: {
          rotate: -90,
        },
      },
      grid: {
        row: {
          colors: ["#ffffff", "#fff"],
          opacity: 1,
        },
      },
    },
  });
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="bar"
      height={130}
    />
  );
};

export default BarchartNegative;
