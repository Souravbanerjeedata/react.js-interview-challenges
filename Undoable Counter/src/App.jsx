import { useState } from "react";

const App = () => {
  const [value, setValue] = useState(0);
  const [redoList, setRedoList] = useState([]);
  const [histories, setHistories] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  function historyHandler(key, prev, current) {
    const historyObj = {
      action: key,
      prev,
      current,
    };
    const historyCopy = [...histories];
    historyCopy.unshift(historyObj);
    setHistories(historyCopy);
  }
  function changeValueHandler(button) {
    const val = Number(button);
    setValue((prevValue) => prevValue + val);
    historyHandler(button, value, value + val);
  }
  function undoHandler() {
    if (histories.length > 0) {
      if (undoCount + 1 > 5) {
        alert("You can undo only upto 5 times!");
        return;
      }
      setUndoCount((prevUndoCount) => prevUndoCount + 1);
      const copyHistories = [...histories];
      const firstHistory = copyHistories.shift();
      setHistories(copyHistories);

      setValue(firstHistory.prev);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstHistory);
      setRedoList(copyRedoList);
    }
  }
  function redoHandler() {
    if (redoList.length > 0) {
      const redoListCopy = [...redoList];
      const redoValue = redoListCopy.pop();
      setRedoList(redoListCopy);
      const { action, prev, current } = redoValue;
      setValue(current);
      historyHandler(action, prev, current);
    }
  }
  return (
    <div className="app">
      <div className="container">
        <h2>Undoable Counter</h2>
        <div className="action-btn">
          <button onClick={undoHandler} disabled={undoCount === 5}>
            undo
          </button>
          <button onClick={redoHandler} disabled={!redoList.length}>
            redo
          </button>
        </div>
        <div className="increase-decrease-btn">
          {["-100", "-10", "-1"].map((btn) => {
            return (
              <button onClick={() => changeValueHandler(btn)}>{btn}</button>
            );
          })}
          <div>{value}</div>
          {["+1", "+10", "+100"].map((btn) => {
            return (
              <button onClick={() => changeValueHandler(btn)}>{btn}</button>
            );
          })}
        </div>
        <div className="history">
          <p>History</p>
          <div className="history-box">
            {histories.map((history) => {
              return (
                <div className="history-row">
                  <div>{history.action}</div>
                  <div>
                    ({history.prev} {"->"} {history.current})
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
