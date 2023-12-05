import React, { memo, useCallback, useState, useEffect } from "react";
import "../App.css";
import { useAppSelector, useAppDispatch } from "../state/hook";
import { setItems, setCurrentIndex } from "../state/Chart/chartSlice";

export default memo(function Controller() {
  const [quantity, setQuantity] = useState<number>(60);
  const [speed, setSpeed] = useState<number>(1);
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.items);

  useEffect(() => {
    setQuantity(Math.min(Math.max(quantity, 1), 200));
  }, [quantity]);

  useEffect(() => {
    setSpeed(Math.min(Math.max(speed, 1), 1000));
  }, [speed]);

  function shuffle() {
    const array = Array.from(Array(quantity).keys());
    array.sort(() => Math.random() - 0.5);
    dispatch(setItems([...array]));
  }

  const sort = useCallback(async () => {
    const array = [...items];
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length; j++) {
        dispatch(setCurrentIndex(j));
        if (array[j] > array[j + 1]) {
          const tmp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = tmp;
          dispatch(setItems([...array]));
          await new Promise((resolve) => setTimeout(resolve, speed));
        }
      }
    }
  }, [items, speed]);

  return (
    <div className="controller-container">
      <input
        type="number"
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuantity(Number(e.target.value))
        }
        placeholder="Amount"
      />
      <input
        type="number"
        value={speed}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSpeed(Number(e.target.value))
        }
        placeholder="Speed (ms)"
      />
      <button onClick={shuffle}>Shuffle</button>
      <button onClick={sort}>Sort</button>
    </div>
  );
});
