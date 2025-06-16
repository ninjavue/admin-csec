import React from "react";
import ColumnChart from "../../components/charts/columnChart";
import ZoomableTimeseriesChart from "../../components/charts/ZoomableTimeseriesChart ";
import DashedLineChart from "../../components/charts/DashedLineChart";

const Charts = () => {
  return (
    <div className="p-4 w-full">
        <DashedLineChart /> 
        <div className="w-full flex">
            <div className="w-1/2">
                <ColumnChart />
            </div>
            <div className="w-1/2">
                <ZoomableTimeseriesChart />
            </div>
        </div>
    </div>
  );
};

export default Charts;
