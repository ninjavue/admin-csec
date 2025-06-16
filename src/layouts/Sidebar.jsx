import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/components/sidebar.scss";

const menuItems = [
  { path: "/dashboard", icon: "ri-dashboard-2-line", label: "Dashboard" },
  { path: "/sitemap", icon: "ri-mind-map", label: "Site map" },
  { path: "/charts", icon: "ri-line-chart-fill", label: "Charts" },
  { path: "/teams", icon: "ri-team-fill", label: "Teams" },
  { path: "/chat", icon: "ri-message-3-line", label: "Chat" },
  { path: "/create-project", icon: "ri-add-box-line", label: "Create Project" },
  { path: "/order", icon: "ri-shopping-cart-line", label: "Order" },
  { path: "/files", icon: "ri-file-text-line", label: "Files" },
  { path: "/profile", icon: "ri-profile-line", label: "Profile" },
  { path: "/calendar", icon: "ri-calendar-line", label: "Calendar" },
  { path: "/settings", icon: "ri-settings-4-line", label: "Settings" },
  { path: "/timeline", icon: "ri-calendar-schedule-line", label: "Timeline" },
];

const Sidebar = ({ toggle }) => {
  const location = useLocation();

  return (
    <aside
      className={`h-full p-4 bg-primary dark:bg-grays text-white ${
        toggle ? "w-80" : "w-20"
      }`}
      id="aside"
    >
      <nav className="w-full">
        <div className="nav-top">
          <div className="logo">
            <img
              src={toggle ? "/images/logo-light.png" : "/images/logo-sm.png"}
              alt=""
              className={`logo-img ${toggle ? "" : "small"}`}
            />
          </div>
        </div>
        <ul className="aside-menu">
          <li className="menu-title mt-6 mb-3">
            <span data-key="t-menu" className={toggle ? "" : "dn"}>
              Menu
            </span>
          </li>

          {menuItems.map((item) => (
            <li key={item.path} className="nav-item">
              <Link
                to={item.path}
                className={`flex justify-start gap-2 ml-2 transition-all mb-3 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <i className={`${item.icon} ${toggle ? "" : "icon-fz"}`}></i>
                <span className={toggle ? "" : "hidden"}>{item.label}</span>
                {!toggle && (
                  <span className="hidden small-s bg-primary p-3 dark:bg-grays z-40">
                    {item.label}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
