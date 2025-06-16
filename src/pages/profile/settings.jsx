import React, { useState } from "react";
import "../../styles/settings.scss";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Personal Details");
  const [skills, setSkills] = useState(["JavaScript"]);

  const tabs = [
    "Personal Details",
    "Change Password",
    "Experience",
    "Privacy Policy",
  ];

  return (
    <div className="w-full mx-auto flex flex-wrap bg-gray-100 dark:bg-darkcontent relative">
      <div className="w-full setttings-head">
      <button className="ml-auto px-4 py-2 bg-white text-gray-700 rounded-md hover:bg-gray-50 flex items-center gap-2 dark:bg-darkcontent dark:text-white text-sm">
              <i className="ri-image-edit-line"></i>
              Change Cover
            </button>
            <div></div>
      </div>
     <div className="w-full flex-wrap flex px-6 settings-body">
     <div className="col-4">
        {/* Profile Header */}
        <div className="bg-white dark:bg-cheader rounded-lg p-6 mb-6">
          <div className="flex justify-center flex-col items-center gap-7">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-yellow-100">
                <img
                  src="/images/avatar.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-white dark:bg-cheader p-1 px-2 rounded-full border dark:border-darkcontent shadow-sm">
                <i className="ri-camera-line text-gray-500 dark:text-gray-400"></i>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold dark:text-white">
                Anna Adame
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Lead Designer / Developer
              </p>
            </div>
            
          </div>
        </div>

        {/* Profile Progress */}
        <div className="bg-white dark:bg-cheader rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold dark:text-white">
              Complete Your Profile
            </h3>
            <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
              <i className="ri-edit-line"></i>
              Edit
            </button>
          </div>
          <div className="relative w-full bg-gray-100 dark:bg-darkcontent rounded-full h-1 mt-10">
            <div className="bg-orange-500 h-1 rounded-full w-[30%]"></div>
            <div className="absolute -top-7 left-[25%] text-[12px] text-white bg-blue-800  px-1 py-0.5 rounded">
              30%
            </div>
          </div>
        </div>

        {/* Portfolio Links */}
        <div className="bg-white dark:bg-cheader rounded-lg p-3 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold dark:text-white">Portfolio</h3>
            <button className="text-blue-600 hover:text-blue-700">
              <i className="ri-add-line mr-1"></i>
              Add
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 min-w-8 bg-gray-100 dark:bg-darkcontent rounded-lg flex items-center justify-center">
                <i className="ri-github-line text-gray-500"></i>
              </div>
              <input
                type="text"
                value="@daveadame"
                className="flex-1 bg-transparent border-b border-gray-200 dark:border-darkcontent focus:outline-none dark:text-white"
                readOnly
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-darkcontent rounded-lg flex items-center justify-center">
                <i className="ri-global-line text-gray-500"></i>
              </div>
              <input
                type="text"
                value="www.velzon.com"
                className="flex-1 bg-transparent border-b border-gray-200 dark:border-darkcontent focus:outline-none dark:text-white"
                readOnly
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 dark:bg-darkcontent rounded-lg flex items-center justify-center">
                <i className="ri-twitter-line text-gray-500"></i>
              </div>
              <input
                type="text"
                value="@dave_adame"
                className="flex-1 bg-transparent border-b border-gray-200 dark:border-darkcontent focus:outline-none dark:text-white"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      <div className="col-8">
        {/* Main Content */}
        <div className="bg-white dark:bg-cheader rounded-lg ml-5">
          {/* Tabs */}
          <div className="border-b dark:border-darkcontent">
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium transition-colors duration-200 relative
                  ${
                    activeTab === tab
                      ? "text-blue-600"
                      : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  First Name
                </label>
                <input
                  type="text"
                  defaultValue="Dave"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Last Name
                </label>
                <input
                  type="text"
                  defaultValue="Adame"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  defaultValue="+(1) 987 6543"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="daveadame@velzon.com"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Joining Date
                </label>
                <input
                  type="text"
                  defaultValue="24 Nov, 2021"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Skills
                </label>
                <div className="w-full px-3 py-1 border border-gray-200 dark:border-darkcontent rounded">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block px-2.5 py-1 bg-blue-50 dark:bg-blue-700 dark:text-white text-blue-600 rounded text-sm mr-2"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Designation
                </label>
                <input
                  type="text"
                  defaultValue="Lead Designer / Developer"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Website
                </label>
                <input
                  type="text"
                  defaultValue="www.velzon.com"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-8">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  defaultValue="California"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  defaultValue="United States"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                  Zip Code
                </label>
                <input
                  type="text"
                  defaultValue="90011"
                  className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                />
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full px-3 py-2 border border-gray-200 dark:border-darkcontent rounded focus:outline-none focus:border-blue-500 dark:bg-transparent dark:text-white text-sm"
                defaultValue="Hi I'm Anna Adame,It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is."
              ></textarea>
            </div>
            <div className="flex gap-2 justify-end mt-5">
                <button className="bg-primary py-2 px-4 rounded-md text-sm text-white">Updates</button>
                <button className="bg-emerald-300 text-green-800 py-2 px-4 rounded-md text-sm">Cancel</button>
            </div>
          </div>

        </div>
      </div>
     </div>
    </div>
  );
};

export default Settings;
