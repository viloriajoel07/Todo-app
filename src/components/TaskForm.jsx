import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { addTask, editTask } from "../app/slices/tasks/taskSlice";
import { Icon } from "@iconify/react";

export const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasksState = useSelector((state) => state.tasks);

  const [tasks, setTasks] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    setTasks({
      ...tasks,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(tasks));
    } else {
      dispatch(addTask({ ...tasks, id: uuid() }));
    }
    navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      setTasks(tasksState.find((task) => task.id === params.id));
    }
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-8">
      <div className="flex flex-col w-full sm:w-[32rem] px-5">
        <nav className="flex items-center justify-between w-full py-4">
          <Link
            to={"/"}
            className="border w-8 rounded-full h-8 flex items-center justify-center"
          >
            <Icon icon={"akar-icons:arrow-left"} />
          </Link>

          <span className="text-2xl font-bold h-full">New task</span>
        </nav>
        <form onSubmit={handleSubmit} className="bg-zinc-800 p-5 rounded-md">
          <label htmlFor="title" className="block text-sm font-bold mb-2">
            Title:
          </label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={tasks.title}
            className="w-full px-4 py-2 rounded-md bg-zinc-600 mb-2 outline-none"
          />
          <label htmlFor="tiel" className="block text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={tasks.description}
            className="w-full h-36 px-4 py-2 rounded-md bg-zinc-600 mb-2 outline-none"
          ></textarea>
          <button className="bg-indigo-800 px-4 py-1 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
};
