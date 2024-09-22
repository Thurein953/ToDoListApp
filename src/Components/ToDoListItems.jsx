import ToDoCards from "./toDoCards"
import { useState } from "react"

export default function ToDoListItems(props) {
    const todos = props.todolist

  return (
        <ul>
            {todos.map((todo, todoIndex) => {
                return (
                    <ToDoCards key={todoIndex} {...props} urgency={false} index={todoIndex}>
                        {todo}
                    </ToDoCards>
                )
            })}
        </ul>
  )
}
