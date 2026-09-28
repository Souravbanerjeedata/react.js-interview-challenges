import { useEffect, useRef, useState } from "react";
import "./index.css";

function App() {
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const hasStarted = useRef(false);
  const completionHandled = useRef(false);
  const isStart = remainingSeconds > 0;

  const displayedHours = Math.floor(remainingSeconds / 3600);
  const displayedMinutes = Math.floor((remainingSeconds % 3600) / 60);
  const displayedSeconds = remainingSeconds % 60;

  function clearInputs() {
    setHours("");
    setMinutes("");
    setSeconds("");
  }

  function handleStart() {
    const values = [hours, minutes, seconds].map((value) =>
      value === "" ? 0 : Number(value),
    );

    if (
      values.some((value) => !Number.isSafeInteger(value) || value < 0) ||
      values.every((value) => value === 0)
    ) {
      window.alert("Enter a positive whole-number duration.");
      return;
    }

    const totalSeconds = values[0] * 3600 + values[1] * 60 + values[2];
    if (!Number.isSafeInteger(totalSeconds)) {
      window.alert("That duration is too long. Please enter a smaller value.");
      return;
    }

    completionHandled.current = false;
    hasStarted.current = true;
    setRemainingSeconds(totalSeconds);
    setIsPaused(false);
  }

  function handleReset() {
    setIsPaused(false);
    setRemainingSeconds(0);
    clearInputs();
    hasStarted.current = false;
    completionHandled.current = false;
  }

  useEffect(() => {
    if (!isStart || isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setRemainingSeconds((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isStart, isPaused]);

  useEffect(() => {
    if (isStart || !hasStarted.current || completionHandled.current) return;

    completionHandled.current = true;
    window.alert("Your countdown has completed");
  }, [isStart]);

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
                  aria-label="Hours"
                  min="0"
                  step="1"
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                />
                <span>HOURS</span>
              </label>
              <label className="time-field">
                <input
                  type="number"
                  placeholder="MM"
                  aria-label="Minutes"
                  min="0"
                  step="1"
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                />
                <span>MINUTES</span>
              </label>
              <label className="time-field">
                <input
                  type="number"
                  placeholder="SS"
                  aria-label="Seconds"
                  min="0"
                  step="1"
                  value={seconds}
                  onChange={(event) => setSeconds(event.target.value)}
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
              aria-label={`${displayedHours} hours ${displayedMinutes} minutes ${displayedSeconds} seconds remaining`}
            >
              <div className="time-unit">
                <strong>{String(displayedHours).padStart(2, "0")}</strong>
                <span>HRS</span>
              </div>
              <span className="separator">:</span>
              <div className="time-unit">
                <strong>{String(displayedMinutes).padStart(2, "0")}</strong>
                <span>MIN</span>
              </div>
              <span className="separator">:</span>
              <div className="time-unit">
                <strong>{String(displayedSeconds).padStart(2, "0")}</strong>
                <span>SEC</span>
              </div>
            </div>

            <div className="btn-container">
              {!isPaused ? (
                <button
                  className="button button-primary"
                  onClick={() => setIsPaused(true)}
                >
                  Ⅱ <span>Pause</span>
                </button>
              ) : (
                <button
                  className="button button-primary"
                  onClick={() => setIsPaused(false)}
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
