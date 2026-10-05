import { useEffect, useState } from "react";

const App = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchImages() {
    setLoading(true);
    const url =
      "https://api.unsplash.com/photos/?client_id=bv7SzMTVZjwHoSR0tls3IsqRrWSxza5rCDiJSte8pKc";
    const res = await fetch(url);
    const result = await res.json();
    const data = result.map((item) => item.urls.regular);
    setImages(data);
    setLoading(false);
  }
  function handleClick(direction) {
    const lastIndex = images.length - 1;
    if (direction === "left") {
      if (index === 0) {
        setIndex(lastIndex);
      } else {
        setIndex((idx) => idx - 1);
      }
    } else if (direction === "right") {
      if (index === lastIndex) {
        setIndex(0);
      } else {
        setIndex((idx) => idx + 1);
      }
    }
  }

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      handleClick("right");
    }, 2000);

    return () => clearInterval(timer);
  }, [index]);
  return (
    <div className="app">
      <h1>Image carousel</h1>
      <div className="container">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <button onClick={() => handleClick("left")}>{"<"}</button>
            <img src={images[index]} />
            <button onClick={() => handleClick("right")}>{">"}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
