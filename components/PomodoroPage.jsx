import { useState } from "react";
import { useParams } from "react-router-dom";
import { Timer2 } from "./Timer2";
import { TaskComponent } from "./TaskComponent";
export const PomodoroPage = () => {
  const { date, month, year } = useParams();

  let currentMonth = new Date(year, month).toLocaleString("default", {
    month: "long",
  });
  const getDaySuffix = (date) => {
    if (date > 3 && date < 21) return "th";
    switch (date % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="bg-green-50">
      <h1 className="font-bold text-3xl text-center pt-6 text-green-600">
        Pomodoro for {date}
        {getDaySuffix(date)} {year}
      </h1>
      <div className="flex justify-around items-center h-screen mt-4">
        <div className="h-screen shadow-lg p-4 bg-green-100 pb-10">
          <TaskComponent></TaskComponent>
        </div>
        <Timer2></Timer2>
      </div>
    </div>
  );
};
