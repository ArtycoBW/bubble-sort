import { memo, useCallback, useEffect, useState } from "react";
import "./App.css";
import Items from "./components/Chart";
import Controller from "./components/Controller";
import swapSound from "../public/swap.mp3";

const App = memo(() => {
  const [quantity, setQuantity] = useState(50);
  const [speed, setSpeed] = useState(10);
  const [isSorting, setIsSorting] = useState(false);
  const [items, setItems] = useState(Array.from(Array(50).keys()));
  const [currentIndex, setCurrentIndex] = useState(-2);

  const shuffle = useCallback(() => {
    const array = Array.from(Array(quantity).keys());
    array.sort(() => Math.random() - 0.5);
    setItems([...array]);
  }, [quantity]);

  const sort = useCallback(async () => {
    const array = [...items];
    const audio = new Audio(swapSound);

    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        setCurrentIndex(j);

        if (array[j] > array[j + 1]) {
          const tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
          setItems([...array]);
          audio.play();
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
    }
  }, [items, speed]);

  useEffect(() => {
    if (!isSorting) return;
    sort();
    setIsSorting(false);
  }, [sort, isSorting]);

  const handleSort = useCallback(() => {
    setIsSorting(true);
  }, []);

  return (
    <div className="App">
      <Controller
        onQuantityChange={setQuantity}
        onSpeedChange={setSpeed}
        onShuffle={shuffle}
        onSort={handleSort}
      />
      <Items items={items} currentIndex={currentIndex} />
    </div>
  );
});

export default App;
