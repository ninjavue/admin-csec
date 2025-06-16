import React, { useEffect, useRef, useState } from "react";
import "../styles/components/header.scss";
import { useDarkMode } from "../hooks/darkMode";
import { Link } from "react-router";

const Header = ({ toggle, setToggle }) => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [text, setText] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isBtn, setIsBtn] = useState("all");
  const dropdownRef = useRef(null);
  const profileDropRef = useRef(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleProfile = () => {
    setIsProfile((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }

      if (
        profileDropRef.current &&
        !profileDropRef.current.contains(event.target)
      ) {
        setIsProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, profileDropRef]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
  
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);
  
  return (
    <header className="bg-white shadow flex justify-between dark:bg-cheader border-solid border-b-1 border-gray-400" >
      <div className="header-left">
        <button
          type="button"
          className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger material-shadow-none mt-1"
          id="topnav-hamburger-icon"
          onClick={() => setToggle(!toggle)}
        >
          <div className={toggle ? "hamburger-icon" : "hamburger-icon active"}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
        <form className="app-search d-none d-md-block">
          <div className="relative">
            <input
              type="text"
              className="form-control bg-searchb text-gray-500 dark:bg-searchbd dark:text-white"
              placeholder="Search..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <span className="mdi mdi-magnify search-widget-icon" />
            <span
              onClick={() => setText("")}
              className={`mdi mdi-close-circle search-widget-icon search-widget-icon-close ${
                text.length > 0 ? "" : "dn"
              }`}
            />
          </div>
        </form>
      </div>

      <div className="header-right">
        <button
          onClick={toggleFullscreen}
          className="header-btn hover:bg-btnhover dark:hover:bg-btnhoverd"
        >
          <i
            className={
              isFullscreen ? "ri-fullscreen-exit-line" : "ri-fullscreen-line"
            }
          ></i>
        </button>
        <button
          className="header-btn hover:bg-btnhover dark:hover:bg-btnhoverd"
          onClick={() => setDarkMode(!darkMode)}
        >
          <i className={darkMode ? "ri-sun-line" : "ri-moon-line"}></i>
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="header-btn hover:bg-btnhover dark:hover:bg-btnhoverd relative bell"
            onClick={toggleDropdown}
          >
            <span>3</span>
            <i class="bi bi-bell"></i>
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-lg rounded-md dropdown z-50">
              <div className="dropdown-top bg-drophead">
                <div className="flex justify-between p-3">
                  <h6 className="m-0 text-lg font-semibold text-white">
                    Notifications
                  </h6>
                  <span className="bg-slate-300 font-semibold text-sm  notif">
                    {" "}
                    4 New
                  </span>
                </div>
                <div className="flex">
                  <button
                    className={`dropdown-top-btn ${
                      isBtn == "all" ? "active" : ""
                    }`}
                    onClick={() => setIsBtn("all")}
                  >
                    All(4)
                  </button>
                  <button
                    className={`dropdown-top-btn ${
                      isBtn == "messages" ? "active" : ""
                    }`}
                    onClick={() => setIsBtn("messages")}
                  >
                    Messages
                  </button>
                  <button
                    className={`dropdown-top-btn ${
                      isBtn == "alerts" ? "active" : ""
                    }`}
                    onClick={() => setIsBtn("alerts")}
                  >
                    Alerts
                  </button>
                </div>
              </div>
              <div className="dropdown-body overflow-y-scroll">
                <div className="dropdown-content">
                  <img
                    className="dropdown-content-img mt-2"
                    src="/images/avatar.jpg"
                    alt=""
                  />
                  <Link to="/" className="dropdown-content-box relative">
                    <div
                      className="dropdown-content-name  dark:text-white text-base
"
                    >
                      Angela Bernier
                    </div>
                    <div
                      className="text-gray-500 dark:text-gray-200 text-sm
"
                    >
                      Answered to your comment on the cash flow forecast's graph
                      🔔.
                    </div>
                  </Link>
                   
                </div>
                <div className="dropdown-content">
                  <img
                    className="dropdown-content-img mt-2"
                    src="/images/avatar.jpg"
                    alt=""
                  />
                  <Link to="/" className="dropdown-content-box relative">
                    <div
                      className="dropdown-content-name  dark:text-white text-base
"
                    >
                      Angela Bernier
                    </div>
                    <div
                      className="text-gray-500 dark:text-gray-200 text-sm
"
                    >
                      Answered to your comment on the cash flow forecast's graph
                      🔔.
                    </div>
                  </Link>
                   
                </div>
                <div className="dropdown-content">
                  <img
                    className="dropdown-content-img mt-2"
                    src="/images/avatar.jpg"
                    alt=""
                  />
                  <Link to="/" className="dropdown-content-box relative">
                    <div
                      className="dropdown-content-name  dark:text-white text-base
"
                    >
                      Angela Bernier
                    </div>
                    <div
                      className="text-gray-500 dark:text-gray-200 text-sm
"
                    >
                      Answered to your comment on the cash flow forecast's graph
                      🔔.
                    </div>
                  </Link>
                   
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileDropRef}>
          <div
            className="profile bg-gray-50 dark:bg-btnhoverd"
            onClick={toggleProfile}
          >
            <img className="profile-img" src="/images/avatar.jpg" alt="" />
            <div className="profile-info">
              <div className="profile-name dark:text-white">Anna Adame</div>
              <div className="profile-profession text-gray-600 dark:text-gray-200">
                Founder
              </div>
            </div>
          </div>
          {isProfile && (
            <div className="absolute z-50 right-8 mt-0 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md profile-dropdown overflow-hidden">
              <div className="welcome text-gray-400 dark:text-gray-200 p-3 pb-0" >Welcome Anna!</div>
              <ul className="profile-dropdown-menu">
                <li className="profile-dropdown-item hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">
                  <Link to="/profile">
                    <i class="ri-user-3-line"></i>
                    <span>Profile</span>
                  </Link>
                </li>
                <li className="profile-dropdown-item hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">
                  <Link to="/chat">
                  <i class="ri-message-2-line"></i>
                    <span>Messages</span>
                  </Link>
                </li>
                <li className="profile-dropdown-item hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">
                  <Link to="/sitemap">
                  <i class="ri-questionnaire-line"></i>
                    <span>Help</span>
                  </Link>
                </li>
                <li className="w-full content-border bg-slate-300"></li>
                <li className="profile-dropdown-item hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">
                  <Link to="/settings">
                  <i class="ri-settings-5-line"></i>
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="profile-dropdown-item hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">
                  <Link to="/logout">
                  <i class="ri-logout-box-r-line"></i>
                    <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
