import React from "react";

const ItemCheckbox = ({ item, onItemSelect, selectedItems }) => {
  const handleItemSelect = () => {
    onItemSelect(item.id);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={selectedItems.includes(item.id)}
        onChange={handleItemSelect}
      />
      {item.name}
    </label>
  );
};

export default ItemCheckbox;