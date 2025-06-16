import React, { useState } from "react";
import { Header, HeaderBottom, Sidebar } from "./";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const [toggle, setToggle] = useState(true);
  return (
      <div className="flex items-stretch h-screen">
        {/* Sidebar */}
        <Sidebar  toggle={toggle}/>

        {/* Main Content */}
        <div className="flex flex-col w-full">
          <Header toggle={toggle} setToggle={setToggle} />
          <HeaderBottom/>
          <main className=" dark:bg-darkcontent h-full dark:text-white main-container">
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default MainLayout;
