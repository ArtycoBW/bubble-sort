import React from "react";

interface ItemsProps {
  items: number[];
  currentIndex: number;
}

const Items = React.memo(({ items, currentIndex }: ItemsProps) => {
  return (
    <ul className="items-container">
      {items.map((item, index) => {
        return (
          <li
            className={
              currentIndex === index || currentIndex + 1 === index
                ? "item active"
                : "item"
            }
            key={`item-${item}`}
            style={{ height: (item + 1) * 4 }}
            color="##f4711f;"
          ></li>
        );
      })}
    </ul>
  );
});

export default Items;
