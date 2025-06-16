import React from "react";

const TimeLine = () => {
  const timelineData = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      username: "@Erica245",
      time: "15 min ago",
      content:
        "With someone is always good luck in your new job with these sweet messages. Make sure you pick out a good luck new job card to go with the words, and pop a beautiful bunch of flowers from our gift range in your basket to make them feel super special.",
      reactions: {
        heart: 52,
        like: 23,
      },
    },
    {
      id: 2,
      date: "22 Oct 2021",
      title: "Adding a new event with attachments",
      description:
        "Too much or too little spacing, as in the example below, can make things unpleasant for the reader.",
      files: [
        {
          icon: "file-pdf",
          name: "Business Template - UI/UX",
          size: "603 kb",
        },
        {
          icon: "file-word",
          name: "Bank Management System",
          size: "9.13 MB",
        },
      ],
    },
    {
      id: 3,
      date: "15 Jul 2021",
      title: "Create new project building product",
      description:
        "Every team project can have a vision. Use the vision to share information with your team to understand and contribute to your project.",
      users: [
        "https://picsum.photos/300/201?random=2001",
        "https://picsum.photos/300/201?random=2002",
        "https://picsum.photos/300/201?random=2000",
      ],
    },
    {
      id: 4,
      date: "18 May 2021",
      user: "Donald Palmer",
      action: "has changed 2 attributes",
      comment:
        "This is an awesome admin dashboard template. It is extremely well structured and works seemlessly with no issues at all. The code is clean and works perfectly. Integration work of course but the template structure made it easy.",
      reactions: {
        heart: 24,
        star: 14,
        badge: 12,
      },
    },
  ];

  return (
    <div className="bg-gray-200 dark:bg-darkcontent">
        <h2 className="text-xl font-semibold pl-5 pt-4 mb-6 text-gray-600 dark:text-gray-200">
          Center Timeline
        </h2>
      <div className="max-w-5xl mx-auto p-6">

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white dark:bg-gray-700"></div>

          {/* Timeline Items */}
          {timelineData.map((item, index) => (
            <div key={item.id} className="relative flex items-center mb-8">
              {/* Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800"></div>

              {/* Content */}
              {index % 2 === 0 ? (
                <>
                  <div className="w-1/2 pr-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                      {/* Post with Avatar */}
                      {item.username && (
                        <div>
                          <div className="flex items-center mb-3">
                            <img
                              src={item.avatar}
                              alt={item.username}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.username}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.time}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <i className="ri-heart-line text-red-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.heart}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="ri-thumb-up-line text-blue-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.like}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Event with Files */}
                      {item.title && !item.user && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {item.description}
                          </p>

                          {item.files && (
                            <div className="flex gap-1">
                              {item.files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                  <i
                                    className={`ri-${file.icon}-line text-2xl text-blue-500 mr-3`}
                                  ></i>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      {file.name.substring(0,19)}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {file.size}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.users && (
                            <div className="flex items-center mt-4 -space-x-2">
                              {item.users.map((user, index) => (
                                <img
                                  key={index}
                                  src={user}
                                  alt={`User ${index + 1}`}
                                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* User Action */}
                      {item.user && (
                        <div>
                          <div className="flex items-center mb-3">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {item.user}
                            </span>
                            <span className="ml-2 text-gray-600 dark:text-gray-300">
                              {item.action}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.comment}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <i className="ri-heart-line text-red-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.heart}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="ri-star-line text-yellow-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.star}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="ri-medal-line text-green-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-1/2 pl-8 text-left">
                    {item.date && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.date}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="w-1/2 pr-8 text-right">
                    {item.date && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.date}
                      </p>
                    )}
                  </div>
                  <div className="w-1/2 pl-8">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                      {/* Post with Avatar */}
                      {item.username && (
                        <div>
                          <div className="flex items-center mb-3">
                            <img
                              src={item.avatar}
                              alt={item.username}
                              className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {item.username}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.time}
                              </p>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.content}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <i className="ri-heart-line text-red-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.heart}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="ri-thumb-up-line text-blue-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.like}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Event with Files */}
                      {item.title && !item.user && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {item.description}
                          </p>

                          {item.files && (
                            <div className="flex gap-1">
                              {item.files.map((file, index) => (
                                <div
                                  key={index}
                                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                  <i
                                    className={`ri-${file.icon}-line text-2xl text-blue-500 mr-3`}
                                  ></i>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      {file.name.substring(0,19)}...
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {file.size}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {item.users && (
                            <div className="flex items-center mt-4 -space-x-2">
                              {item.users.map((user, index) => (
                                <img
                                  key={index}
                                  src={user}
                                  alt={`User ${index + 1}`}
                                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* User Action */}
                      {item.user && (
                        <div>
                          <div className="flex items-center mb-3">
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {item.user}
                            </span>
                            <span className="ml-2 text-gray-600 dark:text-gray-300">
                              {item.action}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-3">
                            {item.comment}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <i className="ri-heart-line text-red-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.heart}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="ri-star-line text-yellow-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.star}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <i className="ri-medal-line text-green-500"></i>
                              <span className="text-sm text-gray-500">
                                {item.reactions.badge}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
