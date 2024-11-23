import { FaCheck, FaEdit, FaTrash } from "react-icons/fa";

function Task({task, index, deleteTask, getSingleTask, setTaskComplete}) {
    return(
        <>
            <div className={`flex justify-between bg-gray-200 py-3 px-2 border-l-4 mb-1 ${task.completed ? "border-l-green-800":"border-l-red-800"} `}>
                <p className={`${task.completed ? "line-through" : ""}`}>
                    <span className="">{index+1}. </span>{task.name}
                </p>

                {/* icons */}
                <div className="flex justify-between space-x-2">
                    <FaCheck onClick={() => setTaskComplete(task)} className="text-green-700 cursor-pointer" size={25}/>
                    <FaEdit onClick={() => getSingleTask(task)} className="text-[#9F2B68] cursor-pointer" size={25}/>
                    <FaTrash onClick={() => deleteTask(task._id)} className="text-red-700 cursor-pointer" size={25} />
                </div>
            </div>
        </>
    )
}

export { Task }