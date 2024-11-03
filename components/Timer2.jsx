import { useEffect, useState } from "react";

export const Timer2 = () => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isSession, setIsSession] = useState(true);
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);

  function timeFormatter(sec) {
    let minutes = Math.floor(sec / 60);
    let seconds = sec % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  return (
    <div className="flex flex-col items-center max-w-md p-5 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex space-x-4 mb-5">
        <button
          className={`flex-1 p-2 text-white rounded-lg ${isSession ? "bg-green-600" : "bg-gray-300"}`}
          onClick={() => {
            setIsSession(true);
            setTimeLeft(pomodoroTime); // Reset time for Pomodoro
          }}
        >
          Pomodoro
        </button>
        <button
          className={`flex-1 p-2 text-white rounded-lg ${!isSession ? "bg-blue-400" : "bg-gray-300"}`}
          onClick={() => {
            setIsSession(false);
            setTimeLeft(breakTime); // Reset time for Short Break
          }}
        >
          Short Break
        </button>
        <button
          className="flex-1 p-2 text-white bg-purple-400 rounded-lg"
          onClick={() => {
            setTimeLeft(10 * 60);
            setIsSession(false);
          }}
        >
          Long Break
        </button>
      </div>

      <h1 className="font-bold text-5xl mb-5">
        {isSession ? "Session" : "Break"}
      </h1>

      <div className="text-4xl font-semibold mb-5">
        {timeFormatter(timeLeft)}
      </div>

      <div className="flex space-x-4">
        <button
          className="p-2 text-white bg-green-500 rounded-lg"
          onClick={() => {
            setIsRunning(true);
          }}
        >
          Start
        </button>
        <button
          className="p-2 text-white bg-yellow-500 rounded-lg"
          onClick={() => {
            setIsRunning(false);
          }}
        >
          Pause
        </button>
        <button
          className="p-2 text-white bg-red-500 rounded-lg"
          onClick={() => {
            setTimeLeft(pomodoroTime);
            setIsRunning(false); // Reset and stop the timer
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
