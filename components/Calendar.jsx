import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../Services/fetchEvents";
import DayBlock from "./DayBlock";
import { EventModal } from "./EventModal";
export const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [customEvents, setCustomEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDayClick = (date) => {
    console.log("clicked");
    setIsModalOpen(true);
    setSelectedDate(date);
  };
  const {
    data: events = [],
    isLoading,
    error,
  } = useQuery(["events"], fetchEvents);
  const handleDeleteEvent = (eventToDelete) => {
    setCustomEvents(customEvents.filter((event) => event !== eventToDelete));
  };

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
  const handleSaveEvent = (eventName, eventDate) => {
    setCustomEvents([...customEvents, { name: eventName, date: eventDate }]);
  };

  return (
    <div className="grid grid-cols-7 gap-2 p-10">
      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
        <div key={day} className="text-center font-bold bg-yellow-200">
          {day}
        </div>
      ))}

      {dates.map((date, index) => (
        <DayBlock
          customEvents={customEvents}
          key={index}
          date={date}
          events={events}
          onClick={() => handleDayClick(date)}
          handleDeleteEvent={handleDeleteEvent}
        />
      ))}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEvent}
        selectedDate={selectedDate}
      ></EventModal>
    </div>
  );
};
