import { useState } from "react";
export const TaskComponent = () => {
  const [tasks, setTasks] = useState([]);
  const [pomo, setPomo] = useState(1);
  const [taskName, setTaskName] = useState("");
  const AddTask = () => {
    if (taskName.trim() === "") {
      return;
    }
    setTasks([...tasks, { name: taskName, pomo: pomo }]);
    setTaskName("");
    setPomo(1);
  };

  return (
    <div className="p-4">
      <div className="flex items-center">
        <input
          className="w-96 p-2 mr-3"
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
        <select
          className="w-24 p-2 bg-red-400 mr-6"
          value={pomo}
          onChange={(e) => setPomo(parseInt(e.target.value))}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((e) => (
            <option key={e} value={e}>
              {e} {e === 1 ? "session" : "sessions"}
            </option>
          ))}
        </select>
        <button className="bg-blue-400 p-2" onClick={AddTask}>
          Add Task
        </button>
      </div>
      <div>
        <ul>
          {" "}
          {tasks.map((task, index) => (
            <li key={index} className="m-2">
              {task.name} - {task.pomo}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
