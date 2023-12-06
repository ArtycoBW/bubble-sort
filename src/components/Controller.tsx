import React, { memo, useCallback, useState, useEffect } from "react";
import "../App.css";
import { useAppDispatch, useAppSelector } from "../state/hook";
import {
  shuffleItems,
  sortItems,
  setSpeed,
  setItems,
} from "../state/Chart/chartSlice";

export default memo(function Controller() {
  const [quantity, setQuantity] = useState<number>(60);
  const [speed, setSpeedValue] = useState<number>(10);
  const dispatch = useAppDispatch();

  const isSorting = useAppSelector((state) => state.items.isSorting);

  useEffect(() => {
    setQuantity((prev) => Math.min(Math.max(prev, 1), 200));
  }, [setQuantity]);

  useEffect(() => {
    setSpeedValue((prev) => Math.min(Math.max(prev, 1), 100));
  }, [setSpeedValue]);

  function shuffle() {
    dispatch(shuffleItems());
  }

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = Math.min(Math.max(+e.target.value, 1), 50);
    setSpeedValue(newSpeed);
    dispatch(setSpeed(newSpeed));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.min(Math.max(+e.target.value, 1), 200);
    setQuantity(newQuantity);

    dispatch(setItems(Array.from(Array(newQuantity).keys())));
  };

  const sort = useCallback(() => {
    dispatch(sortItems());
  }, [dispatch]);

  return (
    <div className="controller-container">
      <input
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        placeholder="Amount"
      />
      <input
        type="number"
        value={speed}
        onChange={handleSpeedChange}
        placeholder="Speed (ms)"
      />
      <button onClick={shuffle} disabled={isSorting}>
        Shuffle
      </button>
      <button onClick={sort} disabled={isSorting}>
        Sort
      </button>
    </div>
  );
});
