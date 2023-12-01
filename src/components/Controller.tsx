import { memo, useCallback } from "react";

interface ControllerProps {
  onQuantityChange: (amount: number) => void;
  onSpeedChange: (speed: number) => void;
  onShuffle: () => void;
  onSort: () => void;
}

const MAX_QUANTITY = 200;
const MIN_QUANTITY = 1;
const MAX_SPEED = 100;
const MIN_SPEED = 1;

export default memo(function Controller({
  onQuantityChange,
  onSpeedChange,
  onShuffle,
  onSort,
}: ControllerProps) {
  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(
        MIN_QUANTITY,
        Math.min(MAX_QUANTITY, e.target.valueAsNumber)
      );
      onQuantityChange(value);
    },
    [onQuantityChange]
  );

  const handleSpeedChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Math.max(
        MIN_SPEED,
        Math.min(MAX_SPEED, e.target.valueAsNumber)
      );
      onSpeedChange(value);
    },
    [onSpeedChange]
  );

  return (
    <div className="controller-container">
      <input
        onChange={handleQuantityChange}
        type="number"
        placeholder="Quantity"
      />
      <input
        onChange={handleSpeedChange}
        type="number"
        placeholder="Speed (ms)"
      />
      <button onClick={onShuffle}>Shuffle</button>
      <button onClick={onSort}>Sort</button>
    </div>
  );
});
