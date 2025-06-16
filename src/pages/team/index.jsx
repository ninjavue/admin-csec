import React, { useState } from "react";
import "../../styles/teams.scss";

const members = [
  {
    id: 1,
    name: "Nancy Martino",
    role: "Team Leader & HR",
    projects: 225,
    tasks: 197,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bg: "https://themesbrand.com/velzon/html/master/assets/images/small/img-9.jpg",
  },
  {
    id: 2,
    name: "Henry Baird",
    role: "Python Developer",
    projects: 352,
    tasks: 376,
    image: "",
    initials: "HB",
    bg: "https://themesbrand.com/velzon/html/master/assets/images/small/img-10.jpg",
  },
  {
    id: 3,
    name: "Frank Hook",
    role: "Project Manager ",
    projects: 164,
    tasks: 182,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bg: "https://themesbrand.com/velzon/html/master/assets/images/small/img-11.jpg",
  },
  {
    id: 4,
    name: "Jennifer Carter",
    role: "UI/UX Designer",
    projects: 241,
    tasks: 204,
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    bg: "https://themesbrand.com/velzon/html/master/assets/images/small/img-12.jpg",
  },
];

const TeamMembers = () => {
  const [isTable, setIsTable] = useState(false);
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 min-h-screen text-white bg-gray-200 dark:bg-darkcontent">
      <div className="bg-white flex justify-between items-center mb-6 p-5 rounded-md dark:bg-cheader shadow-md">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for name or designation..."
            className="text-gray-600 p-2 pl-8 rounded dark:bg-darkcontent dark:text-white border team-search dark:border-0 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <i class="ri-search-line absolute left-2 top-2 text-gray-400"></i>
        </div>
        <div className="flex gap-2">
          <button
            className={` px-2 rounded ${
              !isTable
                ? "bg-primary text-white"
                : "text-gray-900 dark:text-gray-100"
            }`}
            onClick={() => setIsTable(false)}
          >
            <i className="ri-grid-fill text-xl"></i>
          </button>
          <button
            className={` px-2 rounded ${
              isTable
                ? "bg-primary text-white"
                : "text-gray-900 dark:text-gray-100"
            }`}
            onClick={() => setIsTable(true)}
          >
            <i className="ri-list-unordered text-lg"></i>
          </button>
          <button className="bg-tablebtn hover:bg-tablebtnh py-1  px-5 rounded text-white text-base">
            + Add Members
          </button>
        </div>
      </div>

      <div
        className={`grid ${
          isTable
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-6"
        }`}
      >
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`bg-white dark:bg-cheader  rounded-lg overflow-hidden shadow-md flex items-center w-full team-box ${
              isTable ? "mt-5 team-table p-4" : ""
            }`}
          >
            {!isTable && (
              <div
                className="team-head"
                style={{ backgroundImage: `url(${member.bg})` }}
              >
                <div className="team-head-shadow">
                  <button>
                    <i class="ri-more-line"></i>
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-center items-center">
              {member.image ? (
                <img
                  src={member.image}
                  className="rounded-full team-avatar"
                  alt="profile"
                />
              ) : (
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-600 text-white  text-lg font-bold team-avatar">
                  {member.initials}
                </div>
              )}
              <div className={`${isTable ? "-ml-4" : "hidden"}`}>
                <h3
                  className={`text-lg font-bold text-gray-800 dark:text-gray-400 ${
                    isTable ? "text-nowrap" : "-mt-9"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-gray-700 text-nowrap dark:text-gray-500">
                  {member.role}
                </p>
              </div>
            </div>

            <div className={`${!isTable ? "" : "team-middle"}`}>
              <div className={`${isTable ? "hidden" : ""}`}>
                <h3
                  className={`text-lg font-bold text-gray-800 dark:text-gray-400 text-center ${
                    isTable ? "" : "-mt-9"
                  }`}
                >
                  {member.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-500 text-center">
                  {member.role}
                </p>
              </div>
              <div
                className={`flex  mt-2 text-gray-900 dark:text-gray-300 justify-between mb-10 px-20 ${
                  isTable ? "pt-6" : ""
                }`}
              >
                <div className="pr-12 border-r border-dashed">
                  <p className="text-xl font-bold">{member.projects}</p>
                  <p className="text-xs">Projects</p>
                </div>
                <div className={`${isTable ? "pl-12" : "pl-12"}`}>
                  <p className="text-xl font-bold">{member.tasks}</p>
                  <p className="text-xs">Tasks</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                className={`text-nowrap py-2 rounded-md flex justify-center items-center text-darkcontent font-medium dark:text-white bg-gray-200 hover:bg-gray-400 dark:bg-gray-800  dark:hover:bg-gray-600 ${
                  isTable ? "px-6" : "px-24 mb-6"
                }`}
              >
                View Profile
              </button>
              <button className={`${isTable ? "ml-14 mr-6" : "hidden"}`}>
                <i class="ri-more-line text-gray-900 dark:text-white"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
