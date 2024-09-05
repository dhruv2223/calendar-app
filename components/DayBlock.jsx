import React from "react";

const DayBlock = ({ date, events }) => {
  const dayEvents = events?.response?.holidays?.filter((event) => {
    const eventDate = new Date(event.date.iso).getDate();
    return eventDate === date;
  });

  return (
    <div className="border h-24 flex flex-col justify-between p-2">
      <div className="text-sm">{date || ""}</div>
      {dayEvents?.length > 0 && (
        <div className="text-xs text-red-500">{dayEvents[0]?.name}</div>
      )}
    </div>
  );
};

export default DayBlock;
