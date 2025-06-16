import React, { useEffect } from "react";
import CardItems from "../../components/cards/cardItems";
import DataTaskTable from "../../components/tables/DataTaskTable";
import Donut from "../../components/charts/donutchart";
const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Admin Panel";
  }, []);

  return (
    <div className="p-4">
      <CardItems/>
      <Donut/>
      <DataTaskTable/>
    </div>
  );
};

export default Dashboard;
