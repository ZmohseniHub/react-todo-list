import { useEffect, useState } from "react";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import FilterButtons from "./components/FilterButtons";
import TaskItem from "./components/TaskItem";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<"All" | "Completed" | "Active">("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = { id: Date.now(), title: title, completed: false };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    tasks.filter((task) => !task.completed);
  };

  const filterdTasks = tasks.filter((task) => {
    if (filter === "Active") {
      return !task.completed;
    }
    if (filter === "Completed") {
      return task.completed;
    }
    return task;
  });
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="max-w-full sm:max-w-xl md:max-w-2xl min-h-[32rem] container flex flex-col gap-4 sm:gap-8 mx-auto p-2 sm:p-4 bg-white rounded-lg shadow-lg">
        <div className="w-full text-center">
          <h1 className="text-3xl sm:text-5xl my-6 text-bold text-slate-400">
            Todo List
          </h1>
        </div>
        <TaskForm addTask={addTask} />
        <FilterButtons filter={filter} setFilter={setFilter} />

        <div className="w-full text-center min-h-96 space-y-2 sm:space-y-3">
          {filterdTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks available</p>
          ) : (
            filterdTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                editTask={editTask}
                toggleTask={toggleTask}
              />
            ))
          )}
        </div>
        {filterdTasks.length !== 0 && (
          <button
            onClick={clearCompleted}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            {" "}
            Clear Completed
          </button>
        )}
      </div>
    </div>
  );
}
