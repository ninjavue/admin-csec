import React, { useState } from "react";
import Chart from "react-apexcharts";

const ColumnChart = () => {
  const [chartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
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

export default ColumnChart;