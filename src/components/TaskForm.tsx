import { useState } from "react"

interface TaskFormProps{
    addTask: (title:string) => void
}

 function TaskForm ({addTask} : TaskFormProps){
    const [title, setTitle] = useState("")

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();

        if(title.trim()){
            addTask(title)
            setTitle("")
        }
    }

    return(
        <form onSubmit={submitHandler} className="w-full rounded-4xl shadow-[0px_4px_12px_rgba(0,0,0,0.1)]">
            <div className="w-full flex items-center justify-between">
                <input className="w-full py-2 sm:py-4 pl-5 focus:outline-none" type="text" placeholder="What would you like to do?" onChange={(e) => setTitle(e.target.value)} value={title}/>
                <button className="py-2 sm:py-3 px-4 sm:px-8 text-teal-600 cursor-pointer"  type="submit">ADD</button>
            </div>
        </form>
    )
}

export default TaskForm
