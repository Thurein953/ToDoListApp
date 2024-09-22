import { useState, useEffect } from "react"
import ToDoInput from "./Components/toDoInput"
import ToDoListItems from "./Components/toDoListItems"
import ToDoUrgent from "./Components/toDoUrgent"
import ToDoFooter from "./Components/ToDoFooter"

export default function ToDoList() {
  const [todos, setTodos] = useState([])
  const [urgents, setUrgents] = useState([])
  const [tasktobeadded, setTasktobeadded] = useState('')

  function persistTodo (newlist) {
    localStorage.setItem('todos', JSON.stringify({ todos: newlist}))
  }

  function persistUrgent (newlist) {
    localStorage.setItem('urgents', JSON.stringify({ urgents: newlist}))
  }

  function handleAddTodos (newtask) {
    const newlist = [...todos, newtask]
    persistTodo(newlist)
    setTodos(newlist)

  }

  function handleAddUrgent (newtask) {
    const newlist = [...urgents, newtask]
    persistUrgent(newlist)
    setUrgents(newlist)
  }

  function handleDelete (index, urgent) {
    if (urgent) {
      const newlist = urgents.filter((_, urgentIndex) => {
        return urgentIndex !== index
      })
      persistUrgent(newlist)
      setUrgents(newlist)
    }
    else {
      const newlist = todos.filter((_, todoIndex) => {
        return todoIndex !== index
      })
      persistTodo(newlist)
      setTodos(newlist)
    }
  }

  function handleEdit (index, urgent) {
    if (urgent) {
      const toEdit = urgents[index]
      setTasktobeadded(toEdit)
      handleDelete(index, urgent)
    }
    else {
      const toEdit = todos[index]
      setTasktobeadded(toEdit)
      handleDelete(index, urgent)
    }
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
  }, [])

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localUrgents = localStorage.getItem('urgents')
    if (!localUrgents) {
      return
    }

    localUrgents = JSON.parse(localUrgents).urgents
    setUrgents(localUrgents)
  }, [])

  return (
    <div>
      <h1>{todos.length === 0 && urgents.length === 0 ? 'Add tasks to your To-Do list!' : "you've got things to do!"}</h1>
      <ToDoInput handleAddTodos={handleAddTodos} handleAddUrgent={handleAddUrgent} tasktobeadded={tasktobeadded} setTasktobeadded={setTasktobeadded}/>
      {urgents.length !== 0 && <h3>Urgent Tasks</h3>}
      <ToDoUrgent handleDelete={handleDelete} handleEdit={handleEdit} urgentlist={urgents} tasktobeadded={tasktobeadded} setTasktobeadded={setTasktobeadded}/>
      {todos.length !== 0 && <h3>Tasks</h3>}
      <ToDoListItems handleDelete={handleDelete} handleEdit={handleEdit} todolist={todos} tasktobeadded={tasktobeadded} setTasktobeadded={setTasktobeadded}/>
      <ToDoFooter />
    </div>
  )
}
