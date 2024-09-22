import { useState } from "react"

export default function ToDoInput(props) {
  const { handleAddTodos,handleAddUrgent, tasktobeadded, setTasktobeadded } = props
  const [urgentcheck, setUrgentcheck] = useState(false)
  return (
    <div>
        <input type='text' placeholder='Make Plans' value={tasktobeadded} onChange={(e) => setTasktobeadded(e.target.value)}></input>
        <input type='checkbox' value={urgentcheck} onChange={(e) => setUrgentcheck((urgentcheck) => !urgentcheck)}></input>
        <label>Urgent</label>
        <button onClick={() => {
          if (tasktobeadded !== '' && !urgentcheck) {
            handleAddTodos(tasktobeadded)
            setTasktobeadded('')
          }
          else if (tasktobeadded !== '' && urgentcheck) {
            handleAddUrgent(tasktobeadded)
              setTasktobeadded('')
          }
        }}>Add</button>
    </div>
  )
}
