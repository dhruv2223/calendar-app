import { useState } from "react";

export const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [pomodoroSessions, setPomodoroSessions] = useState(1);

  const addTask = () => {
    if (taskName.trim() === "" || pomodoroSessions <= 0) {
      return;
    }

    const newTask = {
      name: taskName,
      sessions: pomodoroSessions,
    };

    setTasks([...tasks, newTask]);
    setTaskName("");
    setPomodoroSessions(1); // Reset input after adding task
  };

  return (
    <div className="p-4">
      {/* Task Input Section */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="border p-2 rounded-md w-60"
        />
        <select
          onChange={(e) => setPomodoroSessions(parseInt(e.target.value))}
          className="border p-2 rounded-md ml-2"
        >
          {/* Providing options 1 to 10 */}
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 1 ? "session" : "sessions"}
            </option>
          ))}
        </select>
        <button
          onClick={addTask}
          className="ml-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Add Task
        </button>
      </div>

      {/* Task List Display */}
      <div>
        {tasks.length === 0 ? (
          <p>No tasks added yet.</p>
        ) : (
          <ul className="list-disc ml-4">
            {tasks.map((task, index) => (
              <li key={index} className="mb-2">
                {task.name} - {task.sessions}{" "}
                {task.sessions > 1 ? "sessions" : "session"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
