import { useEffect, useState, useRef } from "react";
import "./index.css";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Use a ref for the interval so we never have stale IDs
  const timerRef = useRef(null);

  // ---------- Helpers ----------
  function clearTimer() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function resetTimer() {
    clearTimer();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsPaused(false);
  }

  // ---------- Handlers ----------
  function handleStart() {
    // Allow any non-negative combination as long as total time > 0
    if (
      hours < 0 ||
      minutes < 0 ||
      seconds < 0 ||
      (hours === 0 && minutes === 0 && seconds === 0)
    ) {
      alert("Invalid Input!");
      return;
    }
    setIsStart(true);
    setIsPaused(false);
  }

  function handleReset() {
    setIsStart(false);
    resetTimer();
  }

  function handlePause() {
    setIsPaused(true);
    clearTimer();
  }

  function handleResume() {
    setIsPaused(false);
    // The useEffect will automatically restart the interval
  }

  function handleInput(e) {
    const id = e.target.id;
    const value = parseInt(e.target.value) || 0;

    if (id === "hours") setHours(value);
    else if (id === "minutes") setMinutes(value);
    else if (id === "seconds") setSeconds(value);
  }

  // ---------- Core timer logic (uses functional updates → no stale values) ----------
  function tick() {
    setSeconds((prevSec) => {
      if (prevSec > 0) return prevSec - 1;

      // seconds reached 0 → borrow from minutes
      setMinutes((prevMin) => {
        if (prevMin > 0) {
          setSeconds(59);
          return prevMin - 1;
        }

        // minutes also 0 → borrow from hours
        setHours((prevHr) => {
          if (prevHr > 0) {
            setMinutes(59);
            setSeconds(59);
            return prevHr - 1;
          }

          // Everything is 0 → timer finished
          clearTimer();
          setIsStart(false);
          setIsPaused(false);
          alert("Your countdown has completed");
          return 0;
        });

        return 0;
      });

      return 0;
    });
  }

  // ---------- Effect: start / stop the interval ----------
  useEffect(() => {
    // Only run when the timer is active and not paused
    if (isStart && !isPaused) {
      timerRef.current = setInterval(tick, 1000);
    }

    // Cleanup on unmount or when dependencies change
    return () => clearTimer();
  }, [isStart, isPaused]); // ← only these two dependencies (no hours/minutes/seconds)

  // ---------- UI ----------
  return (
    <div className="app">
      <h1>Countdown Timer</h1>

      {!isStart ? (
        <>
          <div className="input-box">
            <input
              type="number"
              placeholder="HH"
              id="hours"
              min="0"
              onChange={handleInput}
            />
            <input
              type="number"
              placeholder="MM"
              id="minutes"
              min="0"
              onChange={handleInput}
            />
            <input
              type="number"
              placeholder="SS"
              id="seconds"
              min="0"
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
            {!isPaused ? (
              <button onClick={handlePause}>Pause</button>
            ) : (
              <button onClick={handleResume}>Resume</button>
            )}
            <button onClick={handleReset}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
