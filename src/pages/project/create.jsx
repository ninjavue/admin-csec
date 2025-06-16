import { useState } from "react";
import { Editor } from "primereact/editor";
import "../../styles/create.scss";

const CreateProject = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [teamLead, setTeamLead] = useState("Jeffrey Salazar");

  const members = [
    {
      id: 1,
      img: "https://randomuser.me/api/portraits/men/1.jpg",
      name: "John Doe",
    },
    {
      id: 2,
      img: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Jane Smith",
    },
    { id: 3, img: "", name: "S" },
  ];

  const handleDrop = (event) => {
    event.preventDefault();
    const uploadedFiles = Array.from(event.dataTransfer.files);
    setFiles([...files, ...uploadedFiles]);
  };

  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles([...files, ...selectedFiles]);
  };

  return (
    <div className="create-row">
      <div className="create-col-8">
        <div className="my-5 mx-2 bg-white dark:bg-cheader p-6 rounded-lg shadow-md dark:text-white">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300">
              Project Title
            </label>
            <input
              type="text"
              placeholder="Enter project title"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkcontent"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300">
              Project Description
            </label>
            <Editor
              value={text}
              onTextChange={(e) => setText(e.htmlValue)}
              style={{ height: "320px" }}
              className="dark:bg-darkcontent dark:text-white rounded-md border overflow-hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300">
                Priority
              </label>
              <select className="w-full dark:bg-darkcontent border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300">
                Status
              </label>
              <select className="dark:bg-darkcontent w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Inprogress</option>
                <option>Completed</option>
                <option>Pending</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 dark:text-gray-300">
                Deadline
              </label>
              <input
                type="date"
                className="dark:bg-darkcontent w-full border rounded-md px-3 create-input focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        <div className="my-5 mx-2 bg-white dark:bg-cheader px-5 py-6 rounded-lg shadow-md dark:text-white">
          <label
            className="block border-2 border-dashed border-gray-300 rounded-lg p-6 dark:bg-gray-900 text-center cursor-pointer h-48"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <i className="ri-upload-cloud-line text-6xl text-gray-400"></i>
            <p className="text-gray-800 dark:text-gray-400 mt-2 text-lg">
              Drop files here or click to upload.
            </p>
          </label>

          {files.length > 0 && (
            <ul className="mt-4 dark:bg-gray-800 p-3 rounded-lg">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="text-gray-900 dark:text-gray-300 text-lg flex items-center gap-2 justify-start"
                >
                  <i className="ri-file-line"></i>
                  <span> {file.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="btn-groups flex justify-end items-center gap-3 mb-14">
          <button className="py-2 px-4 text-base bg-red-500 text-white rounded hover:bg-red-600" >
              Delete
          </button>
          <button className="py-2 px-4 text-base bg-blue-500 text-white rounded hover:bg-blue-600">
              Draft
          </button>
          <button className="py-2 px-4 text-base bg-tablebtn text-white rounded hover:bg-tablebtnh">
              Create
          </button>
        </div>
      </div>
      <div className="create-col-4">
        <div className="my-5 mx-2 bg-white dark:bg-cheader p-6 rounded-lg shadow-md dark:text-white">
          <h3 className="text-lg font-semibold">Members</h3>
          <div className="mt-3">
            <label className="text-base text-gray-600 dark:text-gray-300">Team Lead</label>
            <select
              value={teamLead}
              onChange={(e) => setTeamLead(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-darkcontent"
            >
              <option>Jeffrey Salazar</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="text-base text-gray-600 dark:text-gray-300">Team Members</label>
            <div className="flex items-center gap-2 mt-2 ml-6">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 border-3 -ml-6"
                >
                  {member.img ? (
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full rounded-full"
                    />
                  ) : (
                    <span className="text-gray-700 font-medium">
                      {member.name}
                    </span>
                  )}
                </div>
              ))}
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 border-3 text-gray-600 text-xl -ml-7">
              <i class="ri-add-fill"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
