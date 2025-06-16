import React, { useState } from "react";
import Modal from "../modal";

const DataTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [rows, setRows] = useState([
    {
      id: 1,
      customer: "Timothy Smith",
      email: "timothysmith@velzon.com",
      phone: "973-277-6950",
      joiningDate: "13 Dec, 2021",
      status: "ACTIVE",
    },
    {
      id: 2,
      customer: "Herbert Stokes",
      email: "herbertstokes@velzon.com",
      phone: "312-944-1148",
      joiningDate: "20 Jul, 2021",
      status: "BLOCK",
    },
    {
      id: 3,
      customer: "Charles Kubik",
      email: "charleskubik@velzon.com",
      phone: "231-480-8536",
      joiningDate: "25 Sep, 2021",
      status: "BLOCK",
    },
    {
      id: 4,
      customer: "Glen Matney",
      email: "glenmatney@velzon.com",
      phone: "515-395-1069",
      joiningDate: "02 Nov, 2021",
      status: "ACTIVE",
    },
    {
      id: 5,
      customer: "Carolyn Jones",
      email: "carolynjones@velzon.com",
      phone: "414-453-5725",
      joiningDate: "07 Jun, 2021",
      status: "ACTIVE",
    },
    {
      id: 6,
      customer: "Kevin Dawson",
      email: "kevindawson@velzon.com",
      phone: "213-741-4294",
      joiningDate: "14 Mar, 2021",
      status: "ACTIVE",
    },
    {
      id: 7,
      customer: "Michael Morris",
      email: "michaelmorris@velzon.com",
      phone: "805-447-8398",
      joiningDate: "19 May, 2021",
      status: "BLOCK",
    },
    {
      id: 8,
      customer: "Robert McMahon",
      email: "robertmcmahon@velzon.com",
      phone: "786-253-9927",
      joiningDate: "12 Jan, 2021",
      status: "ACTIVE",
    },
  ]);

  const rowsPerPage = 6;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredRows = rows.filter(
    (row) =>
      row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.phone.includes(searchTerm) ||
      row.joiningDate.includes(searchTerm)
  );
  const currentRows = filteredRows.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const toggleSelectRow = (id) => {
    setSelectAll(false);
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    handleSelectAll();
    if (selectedRows.length === currentRows.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentRows.map((row) => row.id));
    }
  };
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRows(selectAll ? [] : currentRows.map((row) => row.id));
  };
  const deleteSelected = () => {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setSelectAll(!selectAll);
  };

  const handleRemove = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="modal">
            <div className="modal-head bg-sitemap p-5 flex justify-between dark:bg-gray-800">
                <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300">Add Customer</h1>
                <button className="w-7 h-7" onClick={() => setIsOpen(false)}>
                  <i class="ri-close-large-line text-xl text-gray-500 dark:text-gray-200"></i>
                </button>
            </div>
            <div className="modal-body p-5">
                <div className="input-form mb-4">
                    <label className="text-gray-800 mb-3 dark:text-gray-300">Customer Name</label>
                    <input type="text" placeholder="Enter Name" className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0" />
                </div>
                <div className="input-form mb-4">
                    <label className="text-gray-800 mb-3 dark:text-gray-300">Email</label>
                    <input type="text" placeholder="Enter Email" className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0" />
                </div>
                <div className="input-form mb-4">
                    <label className="text-gray-800 mb-3 dark:text-gray-300">Phone</label>
                    <input type="text" placeholder="Enter Phone no." className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0" />
                </div>
                <div className="input-form mb-4">
                    <label className="text-gray-800 mb-3 dark:text-gray-300">Joining Date</label>
                    <input type="date" placeholder="Select Date" className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0" />
                </div>
                <div className="input-form mb-4">
                    <label className="text-gray-800 mb-3 dark:text-gray-300">Status</label>
                    <select name="" id="" className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0" >
                      <option selected disabled >Status</option>
                      <option value="1">Block</option>
                      <option value="2">Active</option>
                    </select>
                </div>
            </div>
            <div className="modal-foot flex justify-end gap-3 p-5">
                <button className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-md dark:text-gray-800" onClick={() => setIsOpen(false)}>Close</button>
                <button className="px-4 py-2 bg-tablebtn hover:bg-tablebtnh rounded-md text-white">Add Customer</button>
            </div>
          </div>
      </Modal>
      <div className="mx-auto">
        <div className="shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              <button className="bg-tablebtn hover:bg-tablebtnh text-white px-3 py-1 rounded" onClick={() => setIsOpen(true)}>
                + Add
              </button>
              <button
                onClick={deleteSelected}
                disabled={selectedRows.length === 0}
                className={` text-white px-3 py-1 rounded ${
                  selectedRows.length
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-gray-400 cursor-not-allowed text-red-500"
                }`}
              >
                <i class="ri-delete-bin-line"></i>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded outline-0 dark:bg-searchbd dark:border-0"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-cheader">
                  <th className="p-3">
                    <input
                      type="checkbox"
                      onChange={toggleSelectAll}
                      checked={
                        selectedRows.length === currentRows.length &&
                        currentRows.length > 0
                      }
                    />
                  </th>
                  <th className="p-3">Mijoz</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Telefon</th>
                  <th className="p-3">Qo'shildi</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row) => (
                    <tr
                      key={row.id}
                      className={` border-t ${
                        selectAll ? "bg-gray-100 dark:bg-cheader" : ""
                      }`}
                    >
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => toggleSelectRow(row.id)}
                        />
                      </td>
                      <td className="p-3">{row.customer}</td>
                      <td className="p-3">{row.email}</td>
                      <td className="p-3">{row.phone}</td>
                      <td className="p-3">{row.joiningDate}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 text-xs font-bold rounded-sm ${
                            row.status === "ACTIVE"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3 flex gap-2">
                        <button className="bg-tablebtn hover:bg-tablebtnh text-white px-3 py-1 text-sm rounded">
                          Edit
                        </button>
                        <button
                          onClick={() => handleRemove(row.id)}
                          className="bg-red-500 text-white px-3 py-1 text-sm rounded hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-3 text-center text-gray-500">
                      Natija topilmadi.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end gap-1 items-center p-3">
            <button
              className={`px-3 py-1 border  rounded ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed "
                  : "hover:bg-primary dark:hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded border ${
                  currentPage === i + 1
                    ? "bg-primary text-white dark:bg-gray-700"
                    : "hover:bg-primary dark:hover:bg-gray-700 hover:text-white"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border  rounded ${
                indexOfLastRow >= filteredRows.length
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-primary dark:hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() =>
                setCurrentPage((prev) =>
                  indexOfLastRow < filteredRows.length ? prev + 1 : prev
                )
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataTable;
