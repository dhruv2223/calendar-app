import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../Services/fetchEvents";
import DayBlock from "./DayBlock";

export const Calendar = () => {
  const [dates, setDates] = useState([]);

  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery(["events"], fetchEvents);

  useEffect(() => {
    const startDay = 1;
    const totalDays = 31; // Total days in January
    const totalBlocks = 35; // 5 rows x 7 columns for grid layout (may include empty slots)
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    // Fill the actual days of January
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }

    while (days.length < totalBlocks) {
      days.push(null);
    }

    setDates(days);
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading events...</div>;

  return (
    <div className="grid grid-cols-7 gap-2 p-10">
      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
        <div key={day} className="text-center font-bold bg-yellow-200">
          {day}
        </div>
      ))}

      {dates.map((date, index) => (
        <DayBlock key={index} date={date} events={events} />
      ))}
    </div>
  );
};
