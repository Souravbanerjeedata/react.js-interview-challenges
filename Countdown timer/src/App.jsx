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
    <main className="app-shell">
      <section className="timer-card" aria-label="Countdown timer">
        <div className="eyebrow">
          <span className="status-dot" /> FOCUS SESSION
        </div>
        <h1>Countdown Timer</h1>
        <p className="subtitle">Make room for what matters.</p>

        {!isStart ? (
          <>
            <div className="input-box">
              <label className="time-field">
                <input
                  type="number"
                  placeholder="HH"
                  id="hours"
                  aria-label="Hours"
                  min="0"
                  onChange={handleInput}
                />
                <span>HOURS</span>
              </label>
              <label className="time-field">
                <input
                  type="number"
                  placeholder="MM"
                  id="minutes"
                  aria-label="Minutes"
                  min="0"
                  onChange={handleInput}
                />
                <span>MINUTES</span>
              </label>
              <label className="time-field">
                <input
                  type="number"
                  placeholder="SS"
                  id="seconds"
                  aria-label="Seconds"
                  min="0"
                  onChange={handleInput}
                />
                <span>SECONDS</span>
              </label>
            </div>
            <button className="button button-primary" onClick={handleStart}>
              <span aria-hidden="true">▶</span> Start focus
            </button>
          </>
        ) : (
          <div className="countdown">
            <div
              className="timer"
              role="timer"
              aria-label={`${hours} hours ${minutes} minutes ${seconds} seconds remaining`}
            >
              <div className="time-unit">
                <strong>{hours < 10 ? `0${hours}` : hours}</strong>
                <span>HRS</span>
              </div>
              <span className="separator">:</span>
              <div className="time-unit">
                <strong>{minutes < 10 ? `0${minutes}` : minutes}</strong>
                <span>MIN</span>
              </div>
              <span className="separator">:</span>
              <div className="time-unit">
                <strong>{seconds < 10 ? `0${seconds}` : seconds}</strong>
                <span>SEC</span>
              </div>
            </div>

            <div className="btn-container">
              {!isPaused ? (
                <button className="button button-primary" onClick={handlePause}>
                  Ⅱ <span>Pause</span>
                </button>
              ) : (
                <button
                  className="button button-primary"
                  onClick={handleResume}
                >
                  ▶ <span>Resume</span>
                </button>
              )}
              <button className="button button-secondary" onClick={handleReset}>
                ↺ <span>Reset</span>
              </button>
            </div>
          </div>
        )}
        <div className="card-footer">
          <span>◷</span> A little focus goes a long way
        </div>
      </section>
      <footer className="page-note">YOUR TIME, ON YOUR TERMS</footer>
    </main>
  );
}

export default App;
