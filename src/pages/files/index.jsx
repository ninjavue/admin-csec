import React, { useState, useRef, useEffect } from "react";
import Modal from "../../components/modal";
import toast, { Toaster } from 'react-hot-toast';
import LordIcon from "../../components/lordicon";
import deleteIcon from "../../assets/icons/delete.json";

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <div
      className={`w-5 h-5 rounded border cursor-pointer flex items-center justify-center transition-all duration-200 
      ${
        checked
          ? "bg-checkbox border-checkbox"
          : "border-gray-300 bg-white dark:bg-darkcontent dark:border-gray-600"
      }`}
      onClick={() => onChange(!checked)}
    >
      {checked && <i class="ri-check-line text-white text-lg"></i>}
    </div>
  );
};

// Custom Select komponenti
const CustomSelect = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 px-4 py-2 bg-white dark:bg-cheader border dark:border-darkcontent rounded-md text-gray-700 dark:text-gray-300 focus:outline-none"
      >
        <span>{selectedOption}</span>
        <i
          className={`ri-arrow-down-s-line ml-2 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        ></i>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-cheader border dark:border-darkcontent rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-darkcontent first:rounded-t-md last:rounded-b-md"
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  isOpen,
  hasSubItems,
  onClick,
  isActive,
  className = "",
}) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-darkcontent
    ${isActive ? "text-emerald-500" : "text-gray-700 dark:text-gray-300"}
    ${className}`}
  >
    <i className={`${icon} text-lg`}></i>
    <span>{text}</span>
    {hasSubItems && (
      <i
        className={`ri-arrow-right-s-line ml-auto transition-transform ${
          isOpen ? "rotate-90" : ""
        }`}
      ></i>
    )}
  </div>
);

// FolderDropdown komponenti
const FolderDropdown = ({ folderName, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      // Delete modal uchun tashqariga bosishni tekshirish
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowDeleteModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = () => {
    onDelete(folderName);
    setShowDeleteModal(false);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-500 hover:bg-gray-100 dark:hover:bg-darkcontent p-1 rounded-md"
      >
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-cheader border dark:border-darkcontent rounded-md shadow-lg z-10">
          <div 
            className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-darkcontent flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <i className="ri-folder-open-line"></i>
            <span>Open</span>
          </div>
          <div 
            className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-darkcontent flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <i className="ri-pencil-line"></i>
            <span>Rename</span>
          </div>
          <div 
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-darkcontent flex items-center gap-2 text-red-600"
          >
            <i className="ri-delete-bin-line"></i>
            <span>Delete</span>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
          onClick={(e) => {
            if (!modalRef.current.contains(e.target)) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div 
            ref={modalRef}
            className="bg-white dark:bg-cheader p-6 rounded-lg w-[600px] animate-deleteModal py-10"
          >
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 animate-iconBounce">
                <LordIcon size={80} src={deleteIcon} />
              </div>
              <h2 className="text-xl font-semibold mb-2 dark:text-white">Are you sure?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
                Are you sure you want to remove this folder?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-darkcontent rounded-md transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-2.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200 animate-deleteBtn"
                >
                  Yes, Delete it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Files = () => {
  const [selectedFolders, setSelectedFolders] = useState({});
  const [openFolder, setOpenFolder] = useState("assets");
  const [activeItem, setActiveItem] = useState("my-drive");
  const [openMyDrive, setOpenMyDrive] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("my-drive");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [folders, setFolders] = useState([
    { name: "Projects", files: 349, size: "4.10GB" },
    { name: "Documents", files: 2348, size: "27.01GB" },
    { name: "Media", files: 12480, size: "20.87GB" },
    { name: "Velzon v1.7.0", files: 180, size: "478.65MB" },
  ]);

  const recentFiles = [
    {
      name: "logo-dark.png",
      type: "image",
      itemNo: "01",
      size: "1.3 MB",
      date: "24 May, 2022",
    },
    {
      name: "velzon-invoice.pdf",
      type: "pdf",
      itemNo: "01",
      size: "1.1 MB",
      date: "05 May, 2022",
    },
    {
      name: "Velzon React",
      type: "folder",
      itemNo: "367",
      size: "934 MB",
      date: "28 Apr, 2022",
    },
  ];

  const handleCheckboxChange = (folderName) => {
    setSelectedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const selectOptions = ["All", "Projects", "Documents", "Velzon", "Media"];

  // Menu strukturasi
  const menuItems = {
    "my-drive": {
      icon: "ri-folder-2-line",
      text: "My Drive",
      subItems: [
        { icon: "ri-folder-2-line", text: "Assets" },
        { icon: "ri-folder-2-line", text: "Marketing" },
        { icon: "ri-folder-2-line", text: "Personal" },
        { icon: "ri-folder-2-line", text: "Projects" },
        { icon: "ri-folder-2-line", text: "Templates" },
      ],
    },
    documents: { icon: "ri-file-list-2-line", text: "Documents" },
    media: { icon: "ri-image-2-line", text: "Media" },
    recent: { icon: "ri-time-line", text: "Recent" },
    important: { icon: "ri-star-line", text: "Important" },
  };

  // Yangi folder qo'shish uchun funksiya
  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      // Folder nomi mavjudligini tekshirish
      const folderExists = folders.some(
        folder => folder.name.toLowerCase() === newFolderName.trim().toLowerCase()
      );

      if (folderExists) {
        // Agar folder nomi mavjud bo'lsa toast xabar ko'rsatish
        toast.error('Bunday nomli fayl allaqachon mavjud!');
        return;
      }

      const newFolder = {
        name: newFolderName,
        files: 0,
        size: "0GB"
      };
      
      setFolders(prevFolders => [newFolder, ...prevFolders]);
      setNewFolderName("");
      setIsModalOpen(false);
      // Muvaffaqiyatli qo'shilganda toast xabar
      toast.success('Fayl muvaffaqiyatli yaratildi!');
    }
  };

  // Folder o'chirish funksiyasi
  const handleDeleteFolder = (folderName) => {
    setFolders(prevFolders => prevFolders.filter(folder => folder.name !== folderName));
    toast.success('Fayl muvaffaqiyatli o\'chirildi!');
  };

  return (
    <div className="flex flex-wrap mx-1 mt-1">
      <Toaster position="top-right" />
      <div className="col-4">
        <div className="py-4 shadow bg-white dark:bg-filebox mr-1 h-full flex flex-col">
          {/* Search */}
          <div className="px-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search here.."
                className="w-full px-4 py-2 pl-10 bg-gray-50 dark:bg-darkcontent border dark:border-darkcontent rounded-md outline-0"
              />
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        </div>
    </div>

          {/* Menu Items Container */}
          <div className="flex-1 flex flex-col">
            {/* Menu Items */}
            <div className="flex-1">
              {/* My Drive with subItems */}
              <SidebarItem
                icon={menuItems["my-drive"].icon}
                text={menuItems["my-drive"].text}
                isActive={selectedMenu === "my-drive"}
                hasSubItems={true}
                isOpen={openMyDrive}
                onClick={() => {
                  setOpenMyDrive(!openMyDrive);
                  setSelectedMenu("my-drive");
                }}
              />

              {openMyDrive &&
                menuItems["my-drive"].subItems.map((item, index) => (
                  <div key={item.text}>
                    <SidebarItem
                      icon={item.icon}
                      text={item.text}
                      isActive={selectedMenu === item.text.toLowerCase()}
                      hasSubItems={item.subItems}
                      isOpen={openFolder === item.text.toLowerCase()}
                      onClick={() => {
                        if (item.subItems) {
                          setOpenFolder(
                            openFolder === item.text.toLowerCase()
                              ? ""
                              : item.text.toLowerCase()
                          );
                        }
                        setSelectedMenu(item.text.toLowerCase());
                      }}
                      className="pl-8"
                    />

                    {/* Assets subItems */}
                    {item.subItems &&
                      openFolder === item.text.toLowerCase() && (
                        <div className="pl-12">
                          {item.subItems.map((subItem) => (
                            <SidebarItem
                              key={subItem.text}
                              icon={subItem.icon}
                              text={subItem.text}
                              isActive={
                                selectedMenu === subItem.text.toLowerCase()
                              }
                              onClick={() =>
                                setSelectedMenu(subItem.text.toLowerCase())
                              }
                            />
                          ))}
                        </div>
                      )}
                  </div>
                ))}

              {/* Other main menu items */}
              {Object.entries(menuItems)
                .filter(([key]) => key !== "my-drive")
                .map(([key, item]) => (
                  <SidebarItem
                    key={key}
                    icon={item.icon}
                    text={item.text}
                    isActive={selectedMenu === key}
                    onClick={() => setSelectedMenu(key)}
                  />
                ))}
            </div>

            {/* Storage Status */}
            <div className="px-4">
              <div className="text-sm text-gray-500 mb-2">STORAGE STATUS</div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-3/4"></div>
              </div>
              <div className="text-sm mt-2 text-gray-600">
                47.52GB used of 119GB
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="p-6 shadow bg-white dark:bg-filebox files-box">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">Folders</h1>
            <div className="flex gap-2">
              <CustomSelect options={selectOptions} />
              <button 
                className="bg-emerald-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                + Create Folders
              </button>
            </div>
          </div>

          {/* Folders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
            {folders.map((folder) => (
              <div
                key={folder.name}
                className="bg-blue-50 rounded-lg p-4 shadow-sm border dark:bg-cheader dark:border-darkcontent"
              >
                <div className="flex justify-between items-start mb-4">
                  <CustomCheckbox
                    checked={selectedFolders[folder.name] || false}
                    onChange={() => handleCheckboxChange(folder.name)}
                  />
                  <FolderDropdown 
                    folderName={folder.name}
                    onDelete={handleDeleteFolder}
                  />
                </div>
                <div className="flex flex-col items-center">
                  <i className="ri-folder-2-fill align-bottom text-5xl display-5 text-folder"></i>
                  <h3 className="text-lg font-medium mt-2 text-gray-700 dark:text-gray-200">{folder.name}</h3>
                  <div className="text-gray-500 dark:text-gray-400 text-sm flex justify-between items-center w-full mt-3">
                    <div>{folder.files} Files </div>
                    <div>{folder.size}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Files */}
          <div className="bg-white rounded-lg shadow-sm border dark:bg-cheader dark:border-darkcontent">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-medium">Recent File</h2>
              <button className="bg-emerald-500 text-white px-4 py-2 rounded-md">
                Create File
              </button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-cheader dark:border-b">
                <tr>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">File Item</th>
                  <th className="text-left p-4">File Size</th>
                  <th className="text-left p-4">Recent Date</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentFiles.map((file) => (
                  <tr key={file.name} className="border-b">
                    <td className="p-4 flex items-center gap-2">
                      {file.type === "folder" ? (
                        <i class="ri-folder-2-fill align-bottom text-2xl display-5 text-folder"></i>
                      ) : (
                        <i class="ri-file-line align-bottom text-2xl display-5 text-folder"></i>
                      )}
                      {file.name}
                    </td>
                    <td className="p-4">{file.itemNo}</td>
                    <td className="p-4">{file.size}</td>
                    <td className="p-4">{file.date}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="text-gray-400">⭐</button>
                        <button className="text-gray-500">•••</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Folder Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewFolderName("");
        }}
      >
        <div className="bg-white dark:bg-cheader p-6 rounded-lg w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Create Folder</h2>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Folder Name
            </label>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full px-3 py-2 border rounded-md outline-none focus:border-emerald-500 dark:bg-darkcontent dark:border-gray-600"
            />
          </div>

          <div className="flex justify-end items-center gap-2">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setNewFolderName("");
              }}
              className="px-4 py-2 text-emerald-500 hover:bg-gray-50 dark:hover:bg-darkcontent rounded-md"
            >
              Close
            </button>
            <button
              onClick={handleAddFolder}
              disabled={!newFolderName.trim()}
              className={`px-4 py-2 text-white rounded-md ${
                newFolderName.trim() 
                  ? 'bg-emerald-500 hover:bg-emerald-600' 
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Add Folder
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Files;
