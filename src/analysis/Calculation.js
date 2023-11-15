import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../menu/MainMenu";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import '../styles/analysisstyle.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Calculation() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const navigate = useNavigate();


    const closeModal = () => {
        setModalIsOpen(false);
        navigate("/calculation");
    };

    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [selectedItems, setSelectedItems] = useState({});
    const [categoryStates, setCategoryStates] = useState({});

    const [calculations, setCalculations] = useState({});

    const [calculation, setCalculation] = useState({
        item: "",
        minValue: "",
        reorderLevel: "",
        maxValue: "",
    });

    const { item, minValue, reorderLevel, maxValue } = calculation


    const getCalculations = async () => {
        const selectedItemsArray = Object.values(selectedItems).flat(); // Преобразование в массив выбранных товаров

        try {
            const result = await axios.post("http://localhost:8081/calculate", { items: selectedItemsArray });
            setCalculations(result.data);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    const setCalculationsToItems = async () => {
        const selectedItemsArray = Object.values(selectedItems).flat();

        try {
            const result = await axios.post("http://localhost:8081/setcalculations", { items: selectedItemsArray });
            setModalIsOpen(true);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };



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
        const updatedSelectedItems = { ...selectedItems };

        if (!updatedSelectedItems[categoryId]) {
            updatedSelectedItems[categoryId] = [];
        }

        if (updatedSelectedItems[categoryId].includes(itemId)) {
            updatedSelectedItems[categoryId] = updatedSelectedItems[categoryId].filter(id => id !== itemId);
        } else {
            updatedSelectedItems[categoryId].push(itemId);
        }

        setSelectedItems(updatedSelectedItems);
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
                            <ul>

                                <table className="table border shadow">
                                    <thead>
                                        <tr>
                                            <th scope="col">ИД</th>
                                            <th scope="col">Склад</th>
                                            <th scope="col">Номеклатура</th>
                                            <th scope="col">Минимальный уровень</th>
                                            <th scope="col">Точка заказа</th>
                                            <th scope="col">Максимальный уровень</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {calculations.length > 0 ? calculations.map((calculation, index) => (
                                            <tr>
                                                <th scope="row" key={index}>
                                                    {index + 1}
                                                </th>
                                                <td>{calculation.storehouse.name}</td>
                                                <td>{calculation.item.name}</td>
                                                <td>{calculation.minValue}</td>
                                                <td>{calculation.reorderLevel}</td>
                                                <td>{calculation.maxValue}</td>


                                            </tr>
                                        )) : <tr><td colSpan="3">Нет данных для отображения</td></tr>}
                                    </tbody>
                                </table>
                            </ul>

                            <ul>
                                <button className="btn btn-dark mx-2" style={{ width: '130px' }} onClick={getCalculations}>
                                    Рассчитать
                                </button>
                            </ul>

                            <ul>
                                <button className="btn btn-dark mx-2" style={{ width: '190px' }} onClick={setCalculationsToItems}>
                                    Установить значения
                                </button>
                            </ul>

                            <Modal show={modalIsOpen} onHide={closeModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Успешная установка рассчитанных значений</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Рассчитанные значения были успешно установлены для выбранных номенклатур!</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={closeModal}>
                                        Закрыть
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}