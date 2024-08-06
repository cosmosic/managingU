// components/TaskCard.tsx
import React from 'react';
import { MdOutlineSettings } from "react-icons/md";
import TaskStatus from "@/components/TaskStatus";

// Define the shape of the Task object
interface Assignee {
  username: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignee: Assignee; // Updated type for assignee
  deadline: string;
}

// Define the props for the TaskCard component
interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
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
        <p>Assignee: {task.assignee.username || "Not assigned"}</p>
        <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default TaskCard;
