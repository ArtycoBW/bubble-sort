import React from "react";
import { useAppSelector } from "../state/hook";

const Items = React.memo(function Items() {
  const { items, currentIndex } = useAppSelector((state) => state.items);

  return (
    <ul className="items-container">
      {items.map((item, index) => (
        <li
          key={`item-${item}`}
          className={
            currentIndex === index || currentIndex + 1 === index
              ? "item active"
              : "item"
          }
          style={{ height: item * 4 }}
        />
      ))}
    </ul>
  );
});

export default Items;
