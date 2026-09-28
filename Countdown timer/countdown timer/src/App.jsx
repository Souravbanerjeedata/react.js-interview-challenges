import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(0);

  function handleStart() {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert("Invalid Input!");
      return;
    }
    setIsStart(true);
  }

  function handleReset() {
    setIsStart(false);
  }

  function handleInput(e) {
    const id = e.target.id;
    const value = parseInt(e.target.value);

    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinutes(value);
    } else if (id === "seconds") {
      setSeconds(value);
    }
  }

  function runTimer(hr, min, sec, tid) {
    if (sec > 0) {
      setSeconds((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (sec === 0 && min === 0 && hr > 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }
    if (sec === 0 && min === 0 && hr === 0) {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      clearInterval(tid);
    }
  }

  useEffect(() => {
    let timerId;
    if (isStart) {
      timerId = setInterval(() => {
        runTimer(hours, minutes, seconds, timerId);
      }, [1000]);
      setTimer(timerId);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [isStart, hours, minutes, seconds]);
  return (
    <>
      <div className="app">
        <h1>Countdown Timer</h1>
        {!isStart ? (
          <>
            <div className="input-box">
              <input
                type="text"
                placeholder="HH"
                id="hours"
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="MM"
                id="minutes"
                onChange={handleInput}
              />
              <input
                type="text"
                placeholder="SS"
                id="seconds"
                onChange={handleInput}
              />
            </div>
            <button onClick={handleStart}>Start</button>
          </>
        ) : (
          <div className="countdown">
            <div className="timer">
              <div>{hours < 10 ? `0${hours}` : hours}</div>
              <span>:</span>
              <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
              <span>:</span>
              <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <div className="btn-container">
              <button>Pause</button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
