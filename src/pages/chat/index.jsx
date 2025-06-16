import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";

const chats = [
  {
    id: 1,
    full_name: "Lisa Parker",
    image:
      "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-2.jpg",
  },
  {
    id: 2,
    full_name: "Frank Thomas",
    image:
      "https://themesbrand.com/velzon/html/master/assets/images/users/avatar-3.jpg",
  },
  {
    id: 3,
    full_name: "John Doe",
    image: "/images/avatar.jpg",
  },
];

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Lisa Parker",
      text: "Hey, I'm going to meet a friend of mine at the department store. I have to buy some presents for my parents 🎁.",
      time: "09:10 am",
      type: "received",
    },
    {
      id: 2,
      sender: "You",
      text: "Wow that's great",
      time: "09:30 am",
      type: "sent",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isChat, setIsChat] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );
  const pickerRef = useRef(null);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      sender: "You",
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "sent",
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      observer.disconnect();
    };
  }, []);

  const selectedChat = chats.find((chat) => chat.id === isChat);

  return (
    <div className=" h-full flex bg-gray-100 m-1 dark:bg-darkcontent">
      {/* Chat List */}
      <div className="w-1/4 bg-white dark:bg-grays flex flex-col">
        <h2 className="text-lg font-semibold mb-4 pt-4 pl-4">Chats</h2>
        <div>
          {chats.map((item) => (
            <div
              className={`flex items-center p-2 rounded-sm cursor-pointer ${
                isChat == item.id ? "bg-chat dark:bg-chatd" : ""
              }`}
              onClick={() => setIsChat(item.id)}
            >
              <img
                src={item.image}
                alt={item.full_name}
                className="w-10 h-10 rounded-full"
              />
              <span className="ml-3 font-medium">{item.full_name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white dark:bg-grays shadow flex items-center ml-1">
          <img
            src={selectedChat.image}
            alt={selectedChat.full_name}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h2 className="text-lg font-semibold">{selectedChat.full_name}</h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 ml-1 dark:bg-darkcontent chat-messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.type === "sent" ? "justify-end" : "justify-start"
              } mb-3`}
            >
              <div>
                <p
                  className={`p-3 rounded-sm max-w-lg ${
                    msg.type === "sent"
                      ? "bg-chat text-tablebtn dark:bg-chatd "
                      : "bg-sitemap text-gray-800 shadow dark:bg-cheader dark:text-gray-300"
                  }`}
                >
                  {msg.text}
                </p>
                <span
                  className={`flex text-xs mt-1 text-gray-500 dark:text-gray-400 ${
                    msg.type === "sent" ? "justify-end" : "justify-start"
                  } mb-3`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-white dark:bg-grays flex items-center ml-1 shadow-lg relative">
          <button className="mr-4" onClick={() => setIsOpen(!isOpen)}>
            <i class="ri-emotion-happy-line text-3xl text-gray-500"></i>
          </button>
          {isOpen && (
            <div
              ref={pickerRef}
              className="absolute bottom-12 left-0 bg-white dark:bg-darkcontent shadow-lg rounded-lg"
            >
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                disableAutoFocus={true}
                theme={isDarkMode ? "dark" : "light"}
              />
            </div>
          )}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="text-lg flex-1 p-2 px-4 dark:py-3 border rounded-md outline-none dark:bg-darkcontent dark:text-gray-200 dark:border-0"
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-tablebtn text-white py-2 px-3 rounded-md hover:bg-tablebtnh"
          >
            <i class="ri-send-plane-2-fill text-xl"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
