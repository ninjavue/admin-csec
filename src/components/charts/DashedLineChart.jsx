import React, { useState } from "react";
import Chart from "react-apexcharts";

const DashedLineChart = () => {
  const [chartData] = useState({
    options: {
      chart: {
        id: "dashed-line-chart",
        type: "line",
        zoom: {
          enabled: true,
        },
      },
      stroke: {
        width: 3,
        dashArray: [5, 8, 10], // Har bir chiziq uchun turli uzunlikda dash
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      legend: {
        position: "top",
      },
    },
    series: [
      {
        name: "Series 1",
        data: [
          [new Date("2023-01-01").getTime(), 30],
          [new Date("2023-02-01").getTime(), 50],
          [new Date("2023-03-01").getTime(), 45],
          [new Date("2023-04-01").getTime(), 70],
          [new Date("2023-05-01").getTime(), 90],
        ],
      },
      {
        name: "Series 2",
        data: [
          [new Date("2023-01-01").getTime(), 20],
          [new Date("2023-02-01").getTime(), 40],
          [new Date("2023-03-01").getTime(), 55],
          [new Date("2023-04-01").getTime(), 60],
          [new Date("2023-05-01").getTime(), 80],
        ],
      },
      {
        name: "Series 3",
        data: [
          [new Date("2023-01-01").getTime(), 25],
          [new Date("2023-02-01").getTime(), 45],
          [new Date("2023-03-01").getTime(), 50],
          [new Date("2023-04-01").getTime(), 65],
          [new Date("2023-05-01").getTime(), 85],
        ],
      },
    ],
  });

  return (
    <div className="app w-full">
      <div className="row w-full">
        <div className="mixed-chart w-full">
          <Chart options={chartData.options} series={chartData.series} type="line" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default DashedLineChart;
