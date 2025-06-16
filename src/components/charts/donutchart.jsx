import React, { useState } from "react";
import Chart from "react-apexcharts";

const Donut = () => {
  const [chartData] = useState({
    options: {
      chart: {
        type: "donut",
      },
      colors: ["#1f2937", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"],
      labels: ["Direct", "Social", "Email", "Other", "Referrals"],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + "%";
        },
        style: {
          fontSize: "12px",
          fontFamily: "Arial, sans-serif",
          fontWeight: 400,
        },
        dropShadow: {
          enabled: false,
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "14px",
        fontFamily: "Arial, sans-serif",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 400,
            },
            legend: {
              position: "bottom",
              floating: false,
            },
          },
        },
      ],
    },
    series: [25.6, 32.0, 23.8, 9.8, 8.7],
  });

  return (
    <div className="bg-white dark:bg-cheader m-4 py-6  rounded-lg shadow-md flex flex-col items-center donot-box dark:text-white">
      <div className="donot-head border-b-2 text-lg w-full pb-1 px-2 mb-3">Store Visits by Source</div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="350"
      />
    </div>
  );
};

export default Donut;
