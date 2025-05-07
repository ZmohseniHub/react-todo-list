import { useState } from "react"
import type { Task } from "../types/task"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';


interface TaskItemProps{
    task: Task
    deleteTask: (id: number) => void
    editTask: (id: number, newTitle:string) => void
    toggleTask: (id: number) => void
}


function TaskItem({task , deleteTask , editTask , toggleTask} : TaskItemProps){
    const [showInput, setShowInput] = useState(false)
    const [newTitle, setnewTitle] = useState(`${task.title}`)

    return(
        <div  className="w-full flex items-center justify-between border-b">
            {showInput ? (
                <div>
                    <input key={task.id} type="text" placeholder={task.title} value={newTitle}
                    onChange={(e) => {
                    setnewTitle(e.target.value)
                    console.log(e);
                    
                    }}
                
                    onKeyUp={(e) =>{ if(e.key === "Enter"){
                    editTask(task.id , newTitle)
                    setShowInput(false)
                    }}}
                    />
                </div>
            ) : (
                <div className="w-full flex items-center justify-start gap-2 sm:gap-4 p-2 sm:p-3 " >
                    <div onClick={() => toggleTask(task.id)}>
                    {
                    !task.completed ? <RadioButtonUncheckedIcon /> : <TaskAltIcon /> 
                }
                    </div>
                    <p className={`${!task.completed ? "" : "line-through"}`} onDoubleClick={() => setShowInput(true)}>{task.title}</p>
                </div>

            )}
            
            <button className="p-1 rounded-full cursor-pointer " onClick={() => deleteTask(task.id)}>
                <DeleteOutlineIcon sx={{transition: 'ease-in-out', '&:hover' : {color: "red"}}}/>
            </button>
        </div>
    )
}
export default TaskItem
