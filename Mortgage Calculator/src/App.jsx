import { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [principal, setPrincipal] = useState("");
  const [interest, setInterest] = useState("");
  const [year, setYear] = useState("");
  const [emi, setEMI] = useState(null);

  function claculateEMI() {
    const P = Number(principal);
    const annualRate = Number(interest);
    const years = Number(year);

    if (!P || !annualRate || !years) {
      setEMI(null);
      return;
    }

    // Monthly interest rate
    const r = annualRate / 100 / 12;
    // Number of months
    const n = years * 12;

    // Standard EMI formula: P * r * (1+r)^n / ((1+r)^n - 1)
    const amount = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setEMI(Math.round(amount));
  }

  return (
    <div>
      <h2>Mortgage Calculator</h2>
      <div>
        <p>Principal loan amount</p>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
        />
      </div>
      <div>
        <p>Interest rate</p>
        <input
          type="number"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
        <span>%</span>
      </div>
      <div>
        <p>Length of loan</p>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <span>Years</span>
      </div>
      <button onClick={claculateEMI}>Calculate</button>
      {emi !== null && (
        <div className="output">
          Your monthly mortgage payment will be ₹{emi}
        </div>
      )}
    </div>
  );
};

export default App;
