import ReactDOM from "react-dom";
import { useState } from "react";
export const EventModal = ({ isOpen, selectedDate, onClose, onSave }) => {
  const [eventName, setEventName] = useState("");
  if (!isOpen) return null;
  const handleSave = () => {
    onSave(eventName, selectedDate);
    onClose();
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg">Add Events for {selectedDate} </h2>
        <input
          placeholder="Event Name"
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="border p-2 rounded w-full mt-2"
        ></input>
        <div className="mt-4 flex justify-around">
          <button
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};
