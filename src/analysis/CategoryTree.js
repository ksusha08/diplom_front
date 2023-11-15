import React, { useState, useEffect } from "react";

function CategoryTree({ categories, onSelectCategory, selectedCategories }) {
  const handleCategorySelect = (categoryId) => {
    onSelectCategory(categoryId);
  };

  const renderCategory = (category) => {
    const isSelected = selectedCategories.includes(category.id);

    return (
      <div key={category.id}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => handleCategorySelect(category.id)}
        />
        {category.name}
        {category.items.length > 0 && (
          <div style={{ marginLeft: "20px" }}>
            {category.items.map((item) => (
              <div key={item.id}>
                <input
                  type="checkbox"
                  checked={isSelected || selectedCategories.includes(item.id)}
                  onChange={() => handleCategorySelect(item.id)}
                />
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {categories.map((category) => renderCategory(category))}
    </div>
  );
}

export default CategoryTree;