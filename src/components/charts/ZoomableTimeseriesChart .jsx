import React, { useState } from "react";
import Chart from "react-apexcharts";

const ZoomableTimeseriesChart = () => {
  const [chartData] = useState({
    options: {
      chart: {
        id: "zoomable-timeseries",
        type: "area",
        zoom: {
          enabled: true,
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
    },
    series: [
      {
        name: "Series 1",
        data: [
          [new Date("2023-01-01").getTime(), 30],
          [new Date("2023-02-01").getTime(), 40],
          [new Date("2023-03-01").getTime(), 45],
          [new Date("2023-04-01").getTime(), 50],
          [new Date("2023-05-01").getTime(), 49],
          [new Date("2023-06-01").getTime(), 60],
          [new Date("2023-07-01").getTime(), 70],
          [new Date("2023-08-01").getTime(), 91],
        ],
      },
    ],
  });

  return (
    <div className="app w-full">
      <div className="row w-full">
        <div className="mixed-chart w-full">
          <Chart options={chartData.options} series={chartData.series} type="area" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default ZoomableTimeseriesChart;
