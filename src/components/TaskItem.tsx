import { useState } from "react";
import type { Task } from "../types/task";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";

interface TaskItemProps {
  task: Task;
  deleteTask: (id: number) => void;
  editTask: (id: number, newTitle: string) => void;
  toggleTask: (id: number) => void;
}

function TaskItem({ task, deleteTask, editTask, toggleTask }: TaskItemProps) {
  const [showInput, setShowInput] = useState(false);
  const [newTitle, setnewTitle] = useState(`${task.title}`);

  return (
    <div className="w-full flex items-center border-b">
      {showInput ? (
        <div className="w-full flex items-center justify-between">
          <input
            className="pl-2 sm:pl-3"
            key={task.id}
            type="text"
            placeholder={task.title}
            value={newTitle}
            onChange={(e) => {
              setnewTitle(e.target.value);
              console.log(e);
            }}
          />
          <button
            type="button"
            onClick={() => {
              editTask(task.id, newTitle);
              setShowInput(false);
            }}
          >
            <DoneIcon />
          </button>
        </div>
      ) : (
        <div className="w-full sm:max-w-md flex items-center justify-start gap-2 sm:gap-4 p-2 sm:p-3 break-words whitespace-normal text-sm sm:text-normal">
          <button onClick={() => toggleTask(task.id)}>
            {!task.completed ? <RadioButtonUncheckedIcon /> : <TaskAltIcon />}
          </button>
          <span className={`${
  !task.completed
    ? "inline break-words whitespace-normal"
    : "inline line-through break-words whitespace-normal"
}`}>
  {task.title}
</span>
        </div>
      )}
      <div className="w-full flex items-center justify-end gap-2 sm:gap-3">
        <button
          className="p-1 rounded-full cursor-pointer "
          onClick={() => setShowInput(true)}
        >
          <EditIcon
            sx={{ transition: "ease-in-out", "&:hover": { color: "green" } }}
          />
        </button>
        <button
          className="p-1 rounded-full cursor-pointer "
          onClick={() => deleteTask(task.id)}
        >
          <DeleteOutlineIcon
            sx={{ transition: "ease-in-out", "&:hover": { color: "red" } }}
          />
        </button>
      </div>
    </div>
  );
}
export default TaskItem;

