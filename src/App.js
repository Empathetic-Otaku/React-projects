import {useState, useEffect} from "react"
import Header from "./components/Header"
import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import Footer from "./components/Footer"
import About from "./components/About"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)//set it to faslse so menu doesn't appear suddenly.

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch Tasks from webpage to json database.
  const fetchTasks = async () => {//use await because we waiting on the info from server
      const restServer = await fetch("http://localhost:5000/tasks")
      const data = await restServer.json()//use await because we waiting to return to database.

      return data
    }
   
    //Like one above but fetches singular task.
  const fetchTask = async (id) => {//use await because we waiting on the info from server
    const restServer = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await restServer.json()//use await because we waiting to return to database.

    return data
  }

//function for adding tasks.(AddTask file)
const addTask = async (task)  => {
  const restServer = await fetch(`http://localhost:5000/tasks`,{
    method:"POST",
    headers:{
      "Content-type": "application/json"
    },
    body: JSON.stringify(task)
  })

  const data = await restServer.json()

  setTasks([...tasks,data])
  
  //const id  = Math.floor(Math.random() * 10000)+1

 // const newTask = {id, ...task}
  //setTasks([...tasks, newTask])
}

//function for deleting tasks
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,
  {
    method:"DELETE"
  })
  setTasks(tasks.filter((task) => task.id !== id))
}

//Toggle reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updateTask = {...taskToToggle, reminder: !taskToToggle.toggleReminder}

  const restServer = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(updateTask)
  })

  const data = await restServer.json()

  setTasks(tasks.map((task) => task.id ===  id
  ? {...task, reminder: data.reminder} : task))
}

return (
  <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ?<Tasks tasks={tasks} 
        onDelete={deleteTask} onToggle={toggleReminder} /> : ("No tasks to show")}
        <Routes><Route path="/about" component={About}/></Routes>
        <Footer/>
      </div>
  </Router>
  )
}


export default App;
