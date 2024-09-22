import { useState, useEffect } from "react"

export default function ToDoTimer() {
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [seconds, setSeconds] = useState(0)
    const [timeleft, setTimeleft] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [reset, setReset] = useState(false)

    useEffect(() => {
        if (!localStorage) {
            return
        }

        let time = localStorage.getItem('timeleft')
        if (!time) {
            return
        }

        time = JSON.parse(time).timeremaining
        setTimeleft(time)
        if (time > 0) {
            setIsPaused(true)
            setReset(true)
        }
    }, [])

    useEffect(() => {
        let tick;
        if (isActive && timeleft > 0) {
            tick = setInterval(() => {
                setTimeleft(t => t - 1)
                localStorage.setItem('timeleft', JSON.stringify({ timeremaining: (timeleft - 1)}))
            }, 1000)
        }
        else if (timeleft === 0) {
            setIsActive(false)
        }

        return () => clearInterval(tick)
    }, [timeleft, isActive])

    function handleStart () {
        localStorage.setItem('timeleft', JSON.stringify({ timeremaining: 0}))
        const totaltimeremaining = (hours * 3600) + (minutes * 60) + seconds;
        setTimeleft(totaltimeremaining)
        setIsActive(true)
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        setIsPaused(false)
        if (totaltimeremaining > 0) {
            setReset(true)
        }
    }

    function handlePause () {
        if (timeleft > 0 && isActive) {
            setIsActive(false)
            setIsPaused(true)
        }
        else {
            setIsActive(true)
            setIsPaused(false)
        }
    }

    function handleReset () {
        setHours(0)
        setMinutes(0)
        setSeconds(0)
        handleStart()
        localStorage.setItem('timeleft', JSON.stringify({ timeremaining: 0}))
        setReset(false)
    }

    function padZero (time) {
        return (String(time).padStart(2, '0'))
    }

    return (
        <div>
            <div>
                <input type='number' max='99' min='0' value={hours} onChange={(e) => {
                    setHours(e.target.value)
                    if (e.target.value === 0 && timeleft > 0) {
                        setReset(true)
                    }
                    else {
                        setReset(false)
                    }
                }}></input>
                <label>Hours</label>
                <input type='number' max='59' min='0' value={minutes} onChange={(e) => {
                    setMinutes(e.target.value)
                    if (e.target.value === 0 && timeleft > 0) {
                        setReset(true)
                    }
                    else {
                        setReset(false)
                    }
                }}></input>
                <label>Minutes</label>
                <input type='number' max='59' min='0' value={seconds} onChange={(e) => {
                    setSeconds(e.target.value)
                    if (e.target.value === 0 && timeleft > 0) {
                        setReset(true)
                    }
                    else {
                        setReset(false)
                    }
                }}></input>
                <label>Seconds</label>
            </div>
    
            <div>
                <button onClick={reset ? handleReset : handleStart}>
                    {reset ? 'Reset' : 'Start'}
                </button>
                <button onClick={handlePause}>
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
            </div>
    
            <h2>
              {padZero(Math.floor(timeleft / 3600))}:
              {padZero(Math.floor((timeleft % 3600) / 60))}:
              {padZero(timeleft % 60)}
            </h2>
        </div>
      )

}