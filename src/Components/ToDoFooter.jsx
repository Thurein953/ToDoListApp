import ToDoTimer from "./toDoTimer"
import { useState, useEffect } from "react"

export default function ToDoFooter() {
    function handleDateTime () {
        const now = new Date();
        const date = now.toLocaleDateString('en-gb');
        const time = now.toLocaleTimeString('en-gb');
        return { date, time };
    }

    const [dateTime, setDateTime] = useState(handleDateTime());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(handleDateTime());
        }, 1000);

        return () => clearInterval(timer);
    }, []);


  return (
    <div>
        <div>
            {dateTime.date} <br />
            {dateTime.time}
        </div>
        <ToDoTimer />
    </div>
  )
}
