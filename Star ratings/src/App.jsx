import { useState } from "react";

const App = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div>
      <h1>Star Rating</h1>
      <div>
        {[1, 2, 3, 4, 5].map((num) => {
          const isFilled = num <= ((rating && hover) || hover);
          return (
            <button
              key={num}
              className={isFilled ? "star-filled" : "star-empty"}
              onClick={() => setRating(num)}
              onMouseOver={() => setHover(num)}
              onMouseLeave={() => setHover(rating)}
            >
              {isFilled ? "★" : "☆"}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default App;

