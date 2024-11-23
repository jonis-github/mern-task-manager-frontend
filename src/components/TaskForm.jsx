function TaskForm({createTask, name, handleInputChange, isEditing, updateTask}) {
    
    return(
        <>
            <form className="flex justify-start" onSubmit={isEditing ? updateTask : createTask}>
                <input 
                    className="w-full border border-black px-2 py-3 outline-none"
                    type="text" 
                    placeholder={isEditing ? "Edit a task" : "Add a task"} 
                    name="name" 
                    value={name} 
                    onChange={handleInputChange}
                />
                <button 
                    className="border border-[#702963] bg-[#9F2B68] rounded-r-md text-white px-2 py-3 w-20" 
                    type="submit"
                >
                    {isEditing ? "Edit" : "Add" }
                </button>
            </form>
        </>
    )
}

export { TaskForm }