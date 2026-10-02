import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [food, setFood] = useState("");
  const [foodList, setFoodList] = useState([]);
  const [bucketList, setBucketList] = useState([]);
  async function fetchData(food) {
    if (food.length > 1) {
      const url = `https://api.frontendeval.com/fake/food/${food}`;
      const result = await fetch(url);
      const data = await result.json();
      setFoodList(data);
    }
  }
  useEffect(() => {
    if (food.length >= 2) {
      fetchData(food);
    }
  }, [food]);

  function handleShoppingList(e) {
    const itemIndex = e.target.getAttribute("data-id");
    if (itemIndex) {
      const obj = {
        id: Date.now(),
        data: foodList[itemIndex],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setFood("");
  }

  function listCheckHandler(id) {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((item) => {
      if (item.id === id) {
        item.isDone = !item.isDone;
      }
      return item;
    });
    setBucketList(newBucketList);
  }

  function deleteItemHandler(id) {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.filter((item) => item.id !== id);
    setBucketList(newBucketList);
  }

  return (
    <div>
      <div>
        <h2>My Shopping List</h2>
        <input
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
      </div>
      {food.length >= 2 && (
        <ul onClick={handleShoppingList}>
          {foodList.map((item, index) => {
            return <li data-id={index}>{item}</li>;
          })}
        </ul>
      )}
      <div>
        {bucketList.map((item) => {
          return (
            <div>
              <button onClick={() => listCheckHandler(item.id)}>✓</button>
              <div className={item.isDone ? "tick" : ""}>{item.data}</div>
              <button onClick={() => deleteItemHandler(item.id)}>X</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
