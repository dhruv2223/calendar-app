import React from "react";

const DayBlock = ({ date, events }) => {
  const dayEvents = events?.data?.response?.holidays?.filter((event) => {
    const eventDate = new Date(event.date.iso).getDate();
    const eventMonth = new Date(event.date.iso).getMonth() + 1;
    return eventDate === date && eventMonth === 1;
  });

  return (
    <div className="border h-24 flex flex-col justify-between p-2">
      <div className="text-sm">{date || ""}</div>
      <div className="text-xs text-red-500">
        {dayEvents.map((event, index) => {
          return <div key={index}>{event.name}</div>;
        })}
      </div>
    </div>
  );
};

export default DayBlock;
