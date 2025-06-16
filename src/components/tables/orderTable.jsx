import React, { useState, useRef, useEffect } from "react";
import Modal from "../modal";
import * as XLSX from 'xlsx';
import toast from 'react-hot-toast';

const CustomSelect = ({ value, options, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full border p-2 rounded-md outline-none bg-white dark:bg-searchbd dark:border-0 min-w-[160px]"
      >
        <span className="text-gray-700 dark:text-gray-300">
          {value || placeholder}
        </span>
        <i
          className={`ri-arrow-down-s-line transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 
                ${
                  value === option.value ? "bg-gray-100 dark:bg-gray-700" : ""
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const OrderTable = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [orderForm, setOrderForm] = useState({
    customer: '',
    product: '',
    amount: '',
    payment: '',
    status: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState("All");
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [rows, setRows] = useState([
    {
      id: "#V212",
      customer: "Alexis Clarke",
      product: "Noise Evolve Smartwatch",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$1021",
      payment: "Mastercard",
      status: "CANCELLED"
    },
    {
      id: "#V211",
      customer: "Diana Kohler",
      product: "Half Sleeve T-Shirts (Blue)",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$874",
      payment: "Visa",
      status: "DELIVERED"
    },
    {
      id: "#V210",
      customer: "Henry Baird",
      product: "Classic Short Sleeve Shirt",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$342",
      payment: "Mastercard",
      status: "INPROGRESS"
    },
    {
      id: "#VZ9",
      customer: "Donald Palmer",
      product: "Oxford Button-Down Shirt",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$373",
      payment: "Visa",
      status: "PICKUPS"
    },
    {
      id: "#VZ8",
      customer: "Alexis Clarke",
      product: "USB Flash Drive Personalized w",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$247",
      payment: "Paypal",
      status: "DELIVERED"
    },
    {
      id: "#VZ7",
      customer: "Nancy Martino",
      product: "Funky Prints T-shirt",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$180",
      payment: "COD",
      status: "RETURNS"
    },
    {
      id: "#VZ6",
      customer: "James Price",
      product: "Apple iPhone 12",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$1240",
      payment: "Visa",
      status: "INPROGRESS"
    },
    {
      id: "#VZ5",
      customer: "Thomas Taylor",
      product: "Galaxy Watch4",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$408",
      payment: "Mastercard",
      status: "PICKUPS"
    },
    {
      id: "#VZ4",
      customer: "Nettie Deloatch",
      product: "American eagle outfitters Shirt",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$142",
      payment: "COD",
      status: "PENDING"
    },
    {
      id: "#VZ3",
      customer: "James Price",
      product: "350 ml Glass Grocery Container",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$829",
      payment: "Visa",
      status: "INPROGRESS"
    },
    {
      id: "#VZ2",
      customer: "Rickey Teran",
      product: "Adidas Sneakers",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$354",
      payment: "Paypal",
      status: "CANCELLED"
    },
    {
      id: "#VZ1",
      customer: "Frank Hook",
      product: "Puma T-shirt",
      orderDate: "20 Apr,2022 4:05 PM",
      amount: "$654",
      payment: "Mastercard",
      status: "PENDING"
    }
  ]);
  const [activeTab, setActiveTab] = useState("All");

  const rowsPerPage = 10;
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filterRows = () => {
    return rows.filter((row) => {
      // Search filter
      const searchFilter =
        searchTerm === "" ||
        row.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.payment.toLowerCase().includes(searchTerm.toLowerCase());

      // Date filter
      const dateFilter =
        selectedDate === "" ||
        (() => {
          const today = new Date();
          const orderDate = new Date(row.orderDate);

          switch (selectedDate) {
            case "today":
              return orderDate.toDateString() === today.toDateString();
            case "week":
              const lastWeek = new Date(
                today.getTime() - 7 * 24 * 60 * 60 * 1000
              );
              return orderDate >= lastWeek;
            case "month":
              return (
                orderDate.getMonth() === today.getMonth() &&
                orderDate.getFullYear() === today.getFullYear()
              );
            default:
              return true;
          }
        })();

      // Status filter from dropdown
      const statusFilter =
        selectedStatus === "All" ||
        row.status.toUpperCase() === selectedStatus.toUpperCase();

      // Payment filter
      const paymentFilter =
        selectedPayment === "All" ||
        row.payment.toUpperCase() === selectedPayment.toUpperCase();

      // Tab filter
      const tabFilter =
        activeTab === "All" ||
        row.status.toUpperCase() === activeTab.toUpperCase();

      return (
        searchFilter && dateFilter && statusFilter && paymentFilter && tabFilter
      );
    });
  };

  const filteredRows = filterRows();
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

  const handleEditClick = (order) => {
    setEditingOrder(order);
    setOrderForm({
      customer: order.customer,
      product: order.product,
      amount: order.amount,
      payment: order.payment,
      status: order.status
    });
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleRemove = (id) => {
    if (window.confirm("Haqiqatdan ham bu buyurtmani o'chirmoqchimisiz?")) {
      setRows(rows.filter((row) => row.id !== id));
      toast.success("Buyurtma muvaffaqiyatli o'chirildi");
    }
  };

  const handleFormSubmit = () => {
    if (isEditMode) {
      // Tahrirlash
      setRows(rows.map(row => 
        row.id === editingOrder.id 
          ? { 
              ...row, 
              customer: orderForm.customer,
              product: orderForm.product,
              amount: orderForm.amount,
              payment: orderForm.payment,
              status: orderForm.status
            }
          : row
      ));
      toast.success("Buyurtma muvaffaqiyatli tahrirlandi");
    } else {
      // Yangi qo'shish
      const newOrder = {
        id: `#V${Math.floor(Math.random() * 1000)}`,
        customer: orderForm.customer,
        product: orderForm.product,
        orderDate: new Date().toLocaleString(),
        amount: orderForm.amount,
        payment: orderForm.payment,
        status: orderForm.status
      };
      setRows([...rows, newOrder]);
      toast.success("Yangi buyurtma qo'shildi");
    }
    
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIsEditMode(false);
    setEditingOrder(null);
    setOrderForm({
      customer: '',
      product: '',
      amount: '',
      payment: '',
      status: ''
    });
  };

  const dateOptions = [
    { value: "", label: "Select date" },
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
  ];

  const statusOptions = [
    { value: "All", label: "All" },
    { value: "Delivered", label: "Delivered" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Inprogress", label: "In Progress" },
    { value: "Pickups", label: "Pickups" },
    { value: "Returns", label: "Returns" },
  ];

  const paymentOptions = [
    { value: "All", label: "All" },
    { value: "Mastercard", label: "Mastercard" },
    { value: "Visa", label: "Visa" },
    { value: "COD", label: "COD" },
    { value: "Paypal", label: "Paypal" },
  ];

  const exportToExcel = () => {
    // Excel uchun ma'lumotlarni tayyorlash
    const exportData = rows.map(row => ({
      'Order ID': row.id,
      'Customer': row.customer,
      'Product': row.product,
      'Order Date': row.orderDate,
      'Amount': row.amount,
      'Payment Method': row.payment,
      'Status': row.status
    }));

    // Excel workbook yaratish
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(exportData);

    // Ustun kengliklari
    const wscols = [
      { wch: 10 }, // Order ID
      { wch: 20 }, // Customer
      { wch: 30 }, // Product
      { wch: 20 }, // Order Date
      { wch: 10 }, // Amount
      { wch: 15 }, // Payment Method
      { wch: 12 }  // Status
    ];
    worksheet['!cols'] = wscols;

    // Workbookga worksheet qo'shish
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    // Faylni yuklash
    XLSX.writeFile(workbook, "orders.xlsx");
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className="modal">
          <div className="modal-head bg-sitemap p-5 flex justify-between dark:bg-gray-800">
            <h1 className="text-xl font-bold text-gray-700 dark:text-gray-300">
              {isEditMode ? "Buyurtmani tahrirlash" : "Yangi buyurtma qo'shish"}
            </h1>
            <button className="w-7 h-7" onClick={handleCloseModal}>
              <i className="ri-close-large-line text-xl text-gray-500 dark:text-gray-200"></i>
            </button>
          </div>
          <div className="modal-body p-5">
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Mijoz ismi</label>
              <input
                type="text"
                value={orderForm.customer}
                onChange={(e) => setOrderForm({...orderForm, customer: e.target.value})}
                placeholder="Mijoz ismini kiriting"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Order Name</label>
              <input
                type="text"
                value={orderForm.product}
                onChange={(e) => setOrderForm({...orderForm, product: e.target.value})}
                placeholder="Enter Order Name"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Price</label>
              <input
                type="text"
                value={orderForm.amount}
                onChange={(e) => setOrderForm({...orderForm, amount: e.target.value})}
                placeholder="Enter Price"
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              />
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Payment Method</label>
              <select
                value={orderForm.payment}
                onChange={(e) => setOrderForm({...orderForm, payment: e.target.value})}
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              >
                <option value="" selected disabled>Select Payment Method</option>
                <option value="Mastercard">Mastercard</option>
                <option value="Visa">Visa</option>
                <option value="COD">Cod</option>
                <option value="Paypal">Paypal</option>
              </select>
            </div>
            <div className="input-form mb-4">
              <label className="text-gray-800 mb-3 dark:text-gray-300">Status</label>
              <select
                value={orderForm.status}
                onChange={(e) => setOrderForm({...orderForm, status: e.target.value})}
                className="border w-full p-2 dark:bg-gray-800 dark:text-white text-gray-900 rounded-md focus:outline-none dark:focus:ring-1 focus:ring-blue-500 dark:border-0"
              >
                <option value="" selected disabled>Select Order Status</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="INPROGRESS">INPROGRESS</option>
                <option value="PICKUPS">PICKUPS</option>
                <option value="RETURNS">RETURNS</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>
          <div className="modal-foot flex justify-end gap-3 p-5">
            <button
              className="px-4 py-2 bg-gray-200 hover:bg-gray-400 rounded-md dark:text-gray-800"
              onClick={handleCloseModal}
            >
              Bekor qilish
            </button>
            <button 
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
              onClick={handleFormSubmit}
            >
              {isEditMode ? "Saqlash" : "Qo'shish"}
            </button>
          </div>
        </div>
      </Modal>
      <div className="mx-auto">
        <div className="shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-xl font-boldtext-gray-700 dark:text-gray-300">
              Order History
            </h1>
            <div className="flex items-center gap-2">
              <button
                className="bg-tablebtn hover:bg-tablebtnh text-white px-3 py-2 rounded-md flex items-center gap-1"
                onClick={() => setIsOpen(true)}
              >
                <i className="ri-add-line"></i>
                Create Order
              </button>
              <button 
                onClick={exportToExcel}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md flex items-center gap-1"
              >
                <i className="ri-file-excel-line"></i>
                Export
              </button>
              {selectedRows.length > 0 && (
                <button 
                  onClick={deleteSelected}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md flex items-center gap-1"
                >
                  <i className="ri-delete-bin-line"></i>
                   ({selectedRows.length})
                </button>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for order ID, customer, order status or something..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border p-2 pl-8 rounded-md outline-none w-[450px] dark:bg-searchbd dark:border-0"
                />
                <i className="ri-search-line absolute left-2 top-2 text-gray-400"></i>
              </div>

              <CustomSelect
                value={selectedDate}
                options={dateOptions}
                onChange={setSelectedDate}
                placeholder="Select date"
              />

              <CustomSelect
                value={selectedStatus}
                options={statusOptions}
                onChange={setSelectedStatus}
                placeholder="Select status"
              />

              <CustomSelect
                value={selectedPayment}
                options={paymentOptions}
                onChange={setSelectedPayment}
                placeholder="Select payment"
              />
            </div>

            <div className="flex gap-2">
              <button className="flex items-center gap-1 bg-primary text-white px-3 py-2 rounded-md">
                <i className="ri-filter-3-line"></i>
                Filters
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4 border-b">
            <button
              onClick={() => setActiveTab("All")}
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 relative ${
                activeTab === "All"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <i
                className={`ri-shopping-bag-line text-lg ${
                  activeTab === "All" ? "text-blue-500" : "text-gray-400"
                }`}
              ></i>
              <span className="font-medium">All Orders</span>
            </button>
            <button
              onClick={() => setActiveTab("DELIVERED")}
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 relative ${
                activeTab === "DELIVERED"
                  ? "border-b-2 border-green-500 text-green-500"
                  : ""
              }`}
            >
              <i
                className={`ri-truck-line text-lg ${
                  activeTab === "DELIVERED" ? "text-green-500" : "text-gray-400"
                }`}
              ></i>
              <span className="font-medium">Delivered</span>
            </button>
            <button
              onClick={() => setActiveTab("PICKUPS")}
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 relative ${
                activeTab === "PICKUPS"
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : ""
              }`}
            >
              <i
                className={`ri-shopping-basket-line text-lg ${
                  activeTab === "PICKUPS" ? "text-blue-500" : "text-gray-400"
                }`}
              ></i>
              <span className="font-medium">Pickups</span>
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                4
              </span>
            </button>
            <button
              onClick={() => setActiveTab("RETURNS")}
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 relative ${
                activeTab === "RETURNS"
                  ? "border-b-2 border-yellow-500 text-yellow-500"
                  : ""
              }`}
            >
              <i
                className={`ri-arrow-go-back-line text-lg ${
                  activeTab === "RETURNS" ? "text-yellow-500" : "text-gray-400"
                }`}
              ></i>
              <span className="font-medium">Returns</span>
            </button>
            <button
              onClick={() => setActiveTab("CANCELLED")}
              className={`flex items-center gap-2 px-4 py-2 text-gray-600 relative ${
                activeTab === "CANCELLED"
                  ? "border-b-2 border-red-500 text-red-500"
                  : ""
              }`}
            >
              <i
                className={`ri-close-circle-line text-lg ${
                  activeTab === "CANCELLED" ? "text-red-500" : "text-gray-400"
                }`}
              ></i>
              <span className="font-medium">Cancelled</span>
            </button>
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
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">ORDER ID</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">CUSTOMER</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">PRODUCT</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">ORDER DATE</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">AMOUNT</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">PAYMENT METHOD</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">DELIVERY STATUS</th>
                  <th className="p-3 text-sm text-gray-600 dark:text-gray-400">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.length > 0 ? (
                  currentRows.map((row) => (
                    <tr
                      key={row.id}
                      className={`border-t ${
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
                      <td className="p-3">{row.id}</td>
                      <td className="p-3">{row.customer}</td>
                      <td className="p-3">{row.product}</td>
                      <td className="p-3">{row.orderDate}</td>
                      <td className="p-3">{row.amount}</td>
                      <td className="p-3">{row.payment}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            row.status === "DELIVERED"
                              ? "bg-green-100 text-green-700"
                              : row.status === "CANCELLED"
                              ? "bg-red-100 text-red-700"
                              : row.status === "INPROGRESS"
                              ? "bg-yellow-100 text-yellow-700"
                              : row.status === "PICKUPS"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button className="text-gray-500 hover:text-gray-700">
                            <i className="ri-eye-line"></i>
                          </button>
                          <button 
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => handleEditClick(row)}
                          >
                            <i className="ri-pencil-line"></i>
                          </button>
                          <button 
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleRemove(row.id)}
                          >
                            <i className="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-3 text-center text-gray-500">
                      No results found.
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

export default OrderTable;
