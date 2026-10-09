import { useState } from "react";

const App = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <h1>Star Rating</h1>
      <div>
        {[1, 2, 3, 4, 5].map((num) => {
          return (
            <button
              key={num}
              onClick={() => setRating(num)}
              onMouseOver={() => setHover(num)}
              onMouseLeave={() => setHover(rating)}
            >
              {num <= ((rating && hover) || hover) ? "★" : "☆"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;
