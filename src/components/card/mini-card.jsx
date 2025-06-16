import React, { useEffect, useState } from "react";
import gsap from "gsap";
import LordIcon from "../lordicon";

const MiniCard = ({title, value, change, textIcon, icon, textColor}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    gsap.to({}, {
      duration: 2,
      ease: "power1.out",
      onUpdate: function () {
        const newValue = (this.progress() * value).toFixed(2);
        setCount(newValue);
      },
    });
  }, [value]);

  return (
    <div className="bg-white dark:bg-cheader rounded-2xl shadow-md p-6 flex items-center justify-between transition-all hover:shadow-lg hover:-translate-y-1">
      <div>
        <p className="text-gray-500 text-base font-medium dark:text-gray-400">{title}</p>
        <h2 className="mt-2 text-4xl font-semibold text-gray-600 dark:text-gray-300">
        <span>{count}</span>k
        </h2>
        <p className="text-gray-500 text-sm mt-3 dark:text-gray-200">
          <span className={`bg-green-100 px-2 py-1 rounded-md text-xs font-medium ${textColor}`}>
            <i className={`${textIcon}`}></i> {change}%
          </span>{" "}
          vs. previous month
        </p>
      </div>
      <div className="bg-blue-100  rounded-full w-14 h-14 flex justify-center align-middle -mt-14 -mr-2">
      <LordIcon size={50} src={icon} />
      </div>
    </div>
  );
};

export default MiniCard;
