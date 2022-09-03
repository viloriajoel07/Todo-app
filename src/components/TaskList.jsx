import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteTask } from "../app/slices/tasks/taskSlice";

export const TaskList = () => {
  const dispatch = useDispatch();

  const tasks = useSelector((state) => state.tasks);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="w-full h-screen px-10 sm:px-20 flex flex-col">
      <header className="flex justify-between items-center py-4 border-b border-gray-600 mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Todo App</h1>
          <h2>All Tasks {tasks.length}</h2>
        </div>
        <Link
          to={"/create-task"}
          className="bg-indigo-800 px-2 py-1 rounded-lg"
        >
          Create Task
        </Link>
      </header>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="bg-neutral-800 p-4 rounded-md">
            <header className="flex justify-between">
              <h3>{task.title}</h3>
              <div className="flex gap-x-2">
                <Link
                  to={`/edit-task/${task.id}`}
                  className="bg-zinc-600 px-2 py-1 text-sm rounded-md"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 px-2 py-1 text-sm rounded-md"
                >
                  Delete
                </button>
              </div>
            </header>
            <p>{task.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
