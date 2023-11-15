import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../menu/MainMenu";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import '../styles/analysisstyle.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Recommendations() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [categoryStates, setCategoryStates] = useState({});

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const result = await axios.get("http://localhost:8081/categories");
            setCategories(result.data);
            loadItemsForCategories(result.data);
        } catch (error) {
            console.error("Ошибка при загрузке категорий:", error);
        }
    };

    const loadItemsForCategories = async (categories) => {
        const itemsData = {};

        for (const category of categories) {
            try {
                const result = await axios.get(`http://localhost:8081/search_items_bycategory/${category.id}`);
                itemsData[category.id] = result.data;
            } catch (error) {
                console.error(`Ошибка при загрузке товаров для категории ${category.name}:`, error);
            }
        }

        setItems(itemsData);
    };

    const handleCategoryCheckboxChange = (categoryId) => {
        setCategoryStates({
            ...categoryStates,
            [categoryId]: !categoryStates[categoryId],
        });

        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    };

    const handleItemCheckboxChange = (categoryId, itemId) => {
        if (!selectedItems[categoryId]) {
            selectedItems[categoryId] = [];
        }

        if (selectedItems[categoryId].includes(itemId)) {
            selectedItems[categoryId] = selectedItems[categoryId].filter(id => id !== itemId);
        } else {
            selectedItems[categoryId].push(itemId);
        }

        setSelectedItems({ ...selectedItems });
    };

    return (
        <div className="items-container">
            <Menu />
            <div className="category-container">
            <ReportMenu />
            
                <div className="row">
                    <div className="col-md-7">
                        <div className="py-4 d-flex justify-content-start">

                            <ul>

                                <div className="checkbox-container2">
                                    <label className="checkbox-text" >
                                        Выберите категории и номенклатуры
                                    </label>
                                    {categories.map((category) => (
                                        <li key={category.id}>
                                            <div className="checkbox-container">
                                                <label className="checkbox-label">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(category.id)}
                                                        onChange={() => handleCategoryCheckboxChange(category.id)}
                                                    />
                                                    {category.name}
                                                </label>
                                                <ul style={{ display: categoryStates[category.id] ? 'block' : 'none' }}>
                                                    {items[category.id]?.map((item) => (
                                                        <li key={item.id}>
                                                            <label className="checkbox-label">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={(selectedItems[category.id] || []).includes(item.id)}
                                                                    onChange={() => handleItemCheckboxChange(category.id, item.id)}
                                                                />
                                                                {item.name}
                                                            </label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}