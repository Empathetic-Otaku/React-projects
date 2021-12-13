//imported useState so all input is local NOT global.
import { useState } from "react"

//component for adding new tasks.
const AddTask = ({ onAdd }) => {
    //Each different input has its own state to be managed because is local.
    const [text, setText] = useState("")
    const [day, setDay] = useState("")
    const [reminder, setReminder] = useState(false)


    const onSubmit = (e) => {
        //prevents it from defaulting submiting to page
        e.preventDefault()

        if(!text){
            alert("pplease ad task")
            return
        }
        onAdd({ text, day, reminder})

        setText("")
        setDay("")
        setReminder(false)
    }
    return (
        <form className="add-form" onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input type="text"
                 placeholder="add task"
                 value={text}
                 onChange={(e) => setText(e.target.value)}></input>
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input type="text"
                 placeholder="add day and time"
                 value={day}
                 onChange={(e) => setDay(e.target.value)}>
                 </input>
            </div>
            <div className="form-control form-control-check">
                <label>Set Reminder</label>
                <input type="checkbox"
                checked ={reminder}
                value={reminder}
                onChange={(e) => setReminder(e.currentTarget.checked)}>
                </input>
            </div>
            <input type="submit"
             value="save"
              className="btn btn-block"></input>
        </form>
        
    )
}

export default AddTask 
