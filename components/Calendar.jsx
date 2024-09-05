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
    const daysInMonth = 31; // Static for now, you will handle dynamic month logic later
    const firstDayOffset = 1; // Assuming Jan 1st starts on Monday (customize later)
    const totalDays = 35; // Total grid blocks (7 days x 5 weeks)

    const days = new Array(totalDays).fill(null);

    for (let i = firstDayOffset; i < firstDayOffset + daysInMonth; i++) {
      days[i] = i - firstDayOffset + 1;
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
