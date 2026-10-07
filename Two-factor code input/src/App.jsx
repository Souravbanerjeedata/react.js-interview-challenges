import { useEffect, useRef, useState } from "react";

const App = () => {
  const emptyArray = ["", "", "", ""];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArray);
  const [missing, setMissing] = useState(emptyArray);
  const CODE = "1234";

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  function handleInputChange(e, index) {
    const val = e.target.value;
    if (!Number(val)) {
      return;
    }

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  }

  function handleOnKeyDown(e, index) {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = "";
      setInputs(copyInputs);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  }

  function handlePaste(e) {
    const data = e.clipboardData.getData("text");
    if (!Number(data) || data.length !== inputs.length) {
      return;
    }

    const pastedData = data.split("");
    setInputs(pastedData);
    refs[inputs.length - 1].current.focus();
  }

  function handleSubmit() {
    const missed = inputs
      .map((item, i) => {
        if (item === "") {
          return i;
        }
      })
      .filter((item) => item || item === 0);
    setMissing(missed);
    if (missed.length) return;

    const userInput = inputs.join("");
    const isValid = userInput === CODE;
    const msg = isValid ? "Your code is valid" : "Your code is invalid";
    alert(msg);
  }

  return (
    <div className="app">
      <h1>Two-factor code input</h1>
      <div className="input-box">
        {emptyArray.map((input, i) => (
          <input
            value={inputs[i]}
            key={i}
            type="text"
            maxLength="1"
            ref={refs[i]}
            onChange={(e) => handleInputChange(e, i)}
            onKeyDown={(e) => handleOnKeyDown(e, i)}
            onPaste={handlePaste}
            className={missing.includes(i) ? "error" : ""}
          />
        ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default App;
