
export default function ToDoCards(props) {

    const { children, handleDelete, handleEdit } = props

  return (
    <li>
        {children}
        <div>
            <button onClick={() => {
              handleEdit(props.index, props.urgency)
            }}>Edit</button>
            <button onClick={() => {
              handleDelete(props.index, props.urgency)
            }}>delete</button>
        </div>
    </li>
  )
}
