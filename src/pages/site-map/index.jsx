import React from "react";
import "../../styles/sitemap.scss";
import { Link } from "react-router-dom";

const SiteMap = () => {
  const sitemap = [
    {
      title: "Account Management",
      children: ["Sign Up", "Login"],
    },
    {
      title: "About Us",
      children: ["Overview", "Connect Via Social Media"],
    },
    {
      title: "Book a Trip",
      children: ["Travel Details", "Reservation Process"],
    },
    {
      title: "Destination",
      children: ["Architecture", "Art"],
    },
    {
      title: "Travel Tips",
      children: ["General Travel", "Health Concerns", "Test Uchun"],
    },
  ];


  return (
    <div className="flex flex-col items-center p-8 min-h-screen">
      {/* Root Node */}
      <div className="relative flex flex-col items-center">
        <div className="bg-sitemap shadow-md px-8 py-5 text-lg font-semibold rounded-md map-root text-gray-500 border-solid border-white dark:bg-cheader dark:text-gray-200 dark:border-gray-600">
          <Link to="/">Velzon Admin</Link>
        </div>
        {/* Dashed line downwards */}
        <div className="w-0.5 h-6 border-l-3 border-dashed border-gray-300"></div>
      </div>

      {/* First Level */}
      <div className="flex mt-6 space-x-24 relative">
        {["Main Pages", "Contact Us"].map((item, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <div className="w-0.5 h-8 border-l-3 border-dashed border-gray-300 -mt-6"></div>

            <div className="bg-sitemap shadow-md px-8 py-5 text-lg font-semibold rounded-md map-root text-gray-500 border-solid border-white map-small dark:bg-cheader dark:text-gray-200 dark:border-gray-600">
              <Link to="/">{item}</Link>
            </div>
            {/* Dashed line downwards */}
            <div className={`w-0.5 h-8 border-l-3 border-dashed border-gray-300 -mb-2 ${index == 1 ? 'hidden':''}`}></div>
          </div>
        ))}

        {/* Horizontal Dashed Line */}
        <div className="absolute -top-6 left-7 w-[calc(50%+48px)] border-t-3 border-dashed border-gray-300"></div>
      </div>

      {/* Second Level */}
      <div className="relative mt-8 flex justify-center">
        <div className="absolute top-[-20px] w-[calc(75%+85px)] border-t-3 border-dashed border-gray-300"></div>

        <div className="grid grid-cols-5 gap-8 -mt-5">
          {sitemap.map((section, index) => (
            <div key={index} className="relative flex flex-col items-center">
              {/* Parent Node */}
              <div className="w-1 h-8 border-l-3 border-dashed border-gray-300"></div>

              <div className="bg-sitemap shadow-md px-2 py-5 text-md font-semibold rounded-md map-root text-gray-500 border-solid border-white map-small map-small-bottom dark:bg-cheader dark:text-gray-200 dark:border-gray-600">
                <Link to="/">{section.title}</Link>
              </div>

              {/* Dashed line downwards */}
              <div className="w-1 h-10 border-l-3 border-dashed border-gray-300"></div>

              {/* Child Nodes */}
              <div className="flex flex-col mt-1 relative map-box">
                {section.children.map((child, idx) => (
                  <div
                    key={idx}
                    className="bg-white mt-10 px-6 py-5 rounded-sm text-base shadow-md border relative map-child text-gray-500 dark:bg-grays dark:text-gray-200 dark:border-gray-500"
                  >
                    <Link to="/">{child}</Link>
                    {/* Dashed line connecting child nodes */}
                    {idx < section.children.length - 1 && (
                      <div className="absolute top-full left-1/2 w-1 h-10 border-l-3 border-dashed border-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteMap;
