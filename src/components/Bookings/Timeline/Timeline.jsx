import React from "react";
import { useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ReactApexChart from "react-apexcharts";
import moment from "moment";

const Timeline = () => {
  const [state, setState] = useState({
    series: [
      {
        data: [
          {
            x: "18",
            y: [
              new Date("2019-02-25").getTime(),
              new Date("2019-02-29").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "19",
            y: [
              new Date("2019-02-26").getTime(),
              new Date("2019-03-04").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "20",
            y: [
              new Date("2019-02-26").getTime(),
              new Date("2019-03-04").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Anna Anntreter",
            y: [
              new Date("2019-02-26").getTime(),
              new Date("2019-03-04").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Analysis",
            y: [
              new Date("2019-02-27").getTime(),
              new Date("2019-03-05").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "2",
            y: [
              new Date("2019-02-29").getTime(),
              new Date("2019-03-03").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "3",
            y: [
              new Date("2019-03-01").getTime(),
              new Date("2019-03-05").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Das ist irgendein langer Name der aus dem Block läuft",
            y: [
              new Date("2019-03-01").getTime(),
              new Date("2019-03-03").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "5",
            y: [
              new Date("2019-02-30").getTime(),
              new Date("2019-03-18").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Design",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "8",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-10").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "9",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-10").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Coding",
            y: [
              new Date("2019-03-07").getTime(),
              new Date("2019-03-10").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "11",
            y: [
              new Date("2019-03-07").getTime(),
              new Date("2019-03-16").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Testing",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "12",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-20").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "13",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-17").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "14",
            y: [
              new Date("2019-03-09").getTime(),
              new Date("2019-03-14").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "15",
            y: [
              new Date("2019-03-10").getTime(),
              new Date("2019-03-19").getTime(),
            ],
            fillColor: "#ffffff",
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-17").getTime(),
            ],
            fillColor: "#ffffff",
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
            position: "bottom",
          },
          stroke: {
            width: 1,
            colors: ["#000000"],
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          var label = opts.w.globals.labels[opts.dataPointIndex];
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return label + ": " + diff + (diff > 1 ? " days" : " day");
        },
        style: {
          colors: ["#000000"],
        },
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        show: false,
      },
      grid: {
        row: {
          colors: ["#f3f4f5"],
          opacity: 1,
        },
      },
    },
  });
  return (
    <ReactApexChart
      options={state.options}
      series={state.series}
      type="rangeBar"
      height={"100%"}
      width={"100%"}
    />
  );
};

export default Timeline;
