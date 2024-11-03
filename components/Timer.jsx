import { useState, useEffect } from "react";

const Timer = () => {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [breakTime, setBreakTime] = useState(5 * 60); // 5 minutes in seconds
  const [isRunning, setIsRunning] = useState(false); // Control start/pause
  const [isSession, setIsSession] = useState(true); // Pomodoro or break
  const [timeLeft, setTimeLeft] = useState(pomodoroTime);

  // Handle timer functionality
  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Function to reset the timer
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isSession ? pomodoroTime : breakTime);
  };

  // Format time to mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Session or Break buttons */}
      <div className="flex justify-between w-1/2 mb-8">
        <button
          onClick={() => {
            setIsSession(true);
            setTimeLeft(pomodoroTime);
          }}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Pomodoro
        </button>
        <button
          onClick={() => {
            setIsSession(false);
            setTimeLeft(breakTime);
          }}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Short Break
        </button>
        <button
          onClick={() => {
            setIsSession(false);
            setTimeLeft(breakTime * 2); // Long break is double the short break
          }}
          className="bg-purple-500 px-4 py-2 rounded text-white"
        >
          Long Break
        </button>
      </div>

      {/* Timer Display */}
      <div className="text-5xl font-bold mb-8">
        {isSession ? "Session" : "Break"}
      </div>
      <div className="text-6xl font-mono">{formatTime(timeLeft)}</div>

      {/* Start and Reset buttons */}
      <div className="flex justify-between w-1/3 mt-8">
        <button
          onClick={() => setIsRunning(true)}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Start
        </button>
        <button
          onClick={() => setIsRunning(false)}
          className="bg-red-500 px-4 py-2 rounded text-white"
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-yellow-500 px-4 py-2 rounded text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
