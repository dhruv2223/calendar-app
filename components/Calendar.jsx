import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../Services/fetchEvents";
import DayBlock from "./DayBlock";
import { EventModal } from "./EventModal";
export const Calendar = () => {
  const navigate = useNavigate();
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(2019);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [customEvents, setCustomEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleDayClick = (date) => {
    console.log("clicked");
    setIsModalOpen(true);
    setSelectedDate(date);
  };
  const handleNextMonth = () => {
    currentMonth === 11
      ? setCurrentMonth(0)
      : setCurrentMonth(currentMonth + 1);
  };
  const handlePreviousMonth = () => {
    currentMonth === 0
      ? setCurrentMonth(11)
      : setCurrentMonth(currentMonth - 1);
  };
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    const savedEvents = localStorage.getItem("customEvents");
    if (savedEvents) {
      setCustomEvents(JSON.parse(savedEvents));
      console.log("Loaded events:", JSON.parse(savedEvents));
    }
  }, []);
  useEffect(() => {
    console.log("Saving customEvents to localStorage", customEvents);
    if (customEvents.length > 0) {
      localStorage.setItem("customEvents", JSON.stringify(customEvents));
    }
  }, [customEvents]);
  const handleDeleteEvent = (eventToDelete) => {
    setCustomEvents(customEvents.filter((event) => event !== eventToDelete));
  };

  useEffect(() => {
    const totalDays = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const totalBlocks = 35;
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
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
  }, [currentMonth, currentYear]);

  const handleSaveEvent = (eventName, eventDate) => {
    setCustomEvents([...customEvents, { name: eventName, date: eventDate }]);
  };
  const handleDoubleClick = (day, currentMonth, currentYear) => {
    navigate(`/pomodoro/${day}/${currentMonth}/${currentYear}`); // Redirect to the pomodoro page
  };
  return (
    <div>
      <div className="flex justify-between p-7">
        <button onClick={handlePreviousMonth} className="bg-gray-200 p-2">
          Previous Month
        </button>
        <div className="text-lg font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
          })}
          {currentYear}
        </div>
        <button onClick={handleNextMonth} className="bg-gray-200 p-2">
          Next Month
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2 p-10">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
          <div key={day} className="text-center font-bold bg-yellow-200">
            {day}
          </div>
        ))}

        {dates.map((date, index) => (
          <DayBlock
            onDoubleClick={() => {
              handleDoubleClick(date, currentMonth, currentYear);
            }}
            customEvents={customEvents}
            key={index}
            date={date}
            onClick={() => handleDayClick(date, currentMonth, currentYear)}
            handleDeleteEvent={handleDeleteEvent}
            currentMonth={currentMonth}
          />
        ))}
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveEvent}
          selectedDate={selectedDate}
          currentYear={currentYear}
          currentMonth={currentMonth}
        ></EventModal>
      </div>
    </div>
  );
};
