import React from "react";
import MiniCard from "../card/mini-card";
import caseIcon from '../../assets/icons/case.json';
import dataIcon from '../../assets/icons/data.json';

const CardItems = () => {
  const cardData = [
    {
      title: "Users",
      value: 28.05,
      change: 16.24,
      textIcon: "ri-arrow-up-line align-middle",
      icon: caseIcon,
      textColor: "text-green-600",
    },
    {
      title: "Sessions",
      value: 97.66,
      change: 3.96,
      textIcon: "ri-arrow-down-line align-middle",
      icon: dataIcon,
      textColor: "text-red-600",
    },
  ];
  return (
    <div className="flex flex-wrap gap-[20px] mb-8 p-4">
      {cardData.map((item, index) => (
        <div key={index} className="w-[calc(50%-10px)]">
          <MiniCard {...item} />
        </div>
      ))}
    </div>
  );
};

export default CardItems;
