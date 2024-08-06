// components/TaskCard.js
import React from 'react';
import { MdOutlineSettings } from "react-icons/md";
import TaskStatus from "@/components/TaskStatus";

const TaskCard = ({ task, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white shadow rounded-md p-4 mb-4 hover:bg-gray-100 transition"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">{task.title}</h3>
        <MdOutlineSettings size={18} />
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <TaskStatus status={task.status} size="small" />
        <p>Assignee: {task.assignee?.username || "Not assigned"}</p>
        <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TaskCard;
