import ToDoCards from "./toDoCards"
import { useState } from "react"

export default function ToDoUrgent(props) {
    const todos = props.urgentlist

  return (
        <ul>
            {todos.map((todo, todoIndex) => {
                return (
                    <ToDoCards key={todoIndex} {...props} urgency={true} index={todoIndex}>
                        {todo}
                    </ToDoCards>
                )
            })}
        </ul>
  )
}
