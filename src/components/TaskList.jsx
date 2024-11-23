import { toast } from "react-toastify"
import axios from "axios"

import { useEffect, useState } from "react"
import { TaskForm, Task } from "./"
import { URL } from "../App"
import loadingImg from "../assets/loader.gif"

// http://localhost:5000/api/tasks

function TaskList() {
    const [formData, setFormData] = useState({
        name:"",
        completed:false,
    })

    const [taskId, setTaskId] = useState("")
    const [tasks, setTasks] = useState([])
    const [completedTasks, setCompletedTasks] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const {name} = formData

    // handle add button
    const handleInputChange = (e) => {
        // console.log(`name:`, e.target.name)
        // console.log(`value:`, e.target.value)
        const {name, value} = e.target

        setFormData({...formData, [name]:value})
        // console.log(`formData:`,formData)
    }

    // add task to the database
    const createTask = async(e) => {
        e.preventDefault()
        // console.log(formData)

        if(name === ""){
            return toast.error("Input field cannot be empty")
        }

        try {
            // axios.post("api","dataYouWantToSend")
            await axios.post(`${URL}/api/tasks`, formData)

            // after sending the data to the database, clear the form
            setFormData({...formData, name:""})

            toast.success("Task added successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }

    // get all tasks from the database
    const getAllTasks = async() => {
        setIsLoading(true)

        try {
            // const allTasks = await axios.get(`${URL}/api/tasks`)
            // console.log(`allTasks: `, allTasks)

            const {data} = await axios.get(`${URL}/api/tasks`)
            setTasks(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            toast.error(error.message)
            // console.log(error.message)
        }
    }

    // delete a tasks
    const deleteTask = async(id) => {
        try {
            await axios.delete(`${URL}/api/tasks/${id}`)
            getAllTasks()
            toast.success("Task deleted successfully")
        } catch (error) {
            toast.error(error.message)
        }
        // console.log(id)
    }

    // get data of a single task
    const getSingleTask = async(task) => {
        setFormData({name:task.name, completed:false})
        setTaskId(task._id)
        setIsEditing(true)
    }

    const updateTask = async(e) => {
        e.preventDefault()

        if(name.trim() === ""){
            return toast.error("Input field cannot be empty")
        }

        try {
            await axios.put(`${URL}/api/tasks/${taskId}`, formData)
            
            // after sending the data to the database, clear the form
            setFormData({...formData, name:""})
            setIsEditing(false)
            toast.success("Task updated successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }

    const setTaskComplete = async(task) => {
        const newFormData = {
            completed:task.completed ? false : true,
        }

        try {
            await axios.put(`${URL}/api/tasks/${task._id}`, newFormData)
            getAllTasks()
            // toast.success("Task updated successfully")
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getAllTasks()  
    }, [formData])

    useEffect(() => {
        const completedTasks = tasks.filter((task) => {
            return task.completed === true
        })
        setCompletedTasks(completedTasks)
    }, [tasks])

    return(
        <>
            <div className="pt-10 pb-5 ">
                <div className="container">
                    <div className="bg-white py-10 px-5 rounded-lg sm:mx-7 lg:mx-auto flex flex-col lg:w-[768px]">
                        <h1 className="text-3xl font-sans font-semibold tracking-wide pb-5">Task Manager</h1>

                        <TaskForm 
                            name={formData.name} 
                            handleInputChange={handleInputChange}
                            createTask={createTask} 
                            isEditing={isEditing} 
                            updateTask={updateTask}
                        />

                        {
                            tasks.length > 0 && (
                                <div className="flex justify-between mt-5 mb-2 border-b border-black">
                                    <p>Total Tasks: {tasks.length}</p>
                                    <p>Completed Tasks: {completedTasks.length}</p>
                                </div>
                            )
                        }

                        {
                            isLoading && (
                                <div className="flex justify-center">
                                    <img src={loadingImg} alt="Loading..." />
                                </div>
                            )
                        }

                        {
                            !isLoading && tasks.length === 0 ? (
                                <p>No pending Task. Please add a task</p>
                            ) 
                            : 
                            (
                                <>
                                    {
                                        tasks.map((task, index) => {
                                            return(
                                                <div key={task._id}>
                                                    <Task 
                                                        task={task} 
                                                        index={index} 
                                                        deleteTask={deleteTask}
                                                        getSingleTask={getSingleTask}
                                                        setTaskComplete={setTaskComplete}
                                                    />
                                                </div>
                                            )
                                        })
                                    }
                                </> 
                            )
                        }
                         
                    </div>
                </div>
            </div>
        </>
    )
}

export { TaskList }