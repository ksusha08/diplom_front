import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../menu/MainMenu";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import '../styles/analysisstyle.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';


export default function Recommendations() {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [categoryStates, setCategoryStates] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [textRecommendations, setTextRecommendations] = useState([]);

    const [isCalculationsPerformed, setIsCalculationsPerformed] = useState(false);

    const downloadPDF = () => {
        const pdf = new jsPDF();

        pdf.text("Recommendations для", 10, 10);

        // Check if recommendations is an array
        if (Array.isArray(recommendations)) {
            // Add table content to PDF
            pdf.autoTable({
                startY: 20,
                head: [['ИД', 'Номенклатура', 'Прогноз 1', 'Прогноз 2', 'Прогноз 3']],
                body: recommendations.map((recommendation, index) => [
                    index + 1,
                    recommendation.item.name,
                    Math.round(recommendation.forecastAmount1).toString(),
                    Math.round(recommendation.forecastAmount2).toString(),
                    Math.round(recommendation.forecastAmount3).toString(),
                ]),
                styles: {
                    font: 'helvetica', // or 'arial'
                },
            });
        }

        // Save and download the PDF
        pdf.save("recommendations.pdf");
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

    const loadRecommendations = async () => {

        const selectedItemsArray = Object.values(selectedItems).flat(); // Преобразование в массив выбранных товаров

        try {
            const result = await axios.post("http://localhost:8081/recommendations", { items: selectedItemsArray });
            setRecommendations(result.data);
            setIsCalculationsPerformed(true);
            loadTextRecommendations();
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
        }
    };

    const loadTextRecommendations = async () => {
        const selectedItemsArray = Object.values(selectedItems).flat();

        try {
            const result = await axios.post("http://localhost:8081/textrecommendations", { items: selectedItemsArray });
            const formattedTextRecommendations = result.data.map((recommendation) => recommendation.recommendationText).join('\n');
            setTextRecommendations(formattedTextRecommendations);
            setIsCalculationsPerformed(true);
        } catch (error) {
            console.error("Ошибка при получении данных:", error);
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

    const getMonthName = (month) => {
        const monthNames = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ];
        return monthNames[month];
    };

    const getCurrentMonth = () => {
        const currentDate = new Date();
        return getMonthName(currentDate.getMonth());
    };

    const getNextMonth = () => {
        const currentDate = new Date();
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1);
        return getMonthName(nextMonth.getMonth());
    };

    const getNext2Month = () => {
        const currentDate = new Date();
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 2);
        return getMonthName(nextMonth.getMonth());
    };

    const getNext3Month = () => {
        const currentDate = new Date();
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 3);
        return getMonthName(nextMonth.getMonth());
    };



    const renderTableHeaders = () => {
        const headers = ["ИД", "Номеклатура", "Проноз на " + getNextMonth(), "Проноз на " + getNext2Month(), "Проноз на " + getNext3Month()];
        return headers.map((header, index) => <th key={index} scope="col">{header}</th>);
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

                                <table className="table border shadow" style={{ width: '700px' }}>
                                    <thead>
                                        <tr>
                                            {renderTableHeaders()}

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {recommendations.length > 0 ? recommendations.map((recommendation, index) => (
                                            <tr>
                                                <th scope="row" key={index}>
                                                    {index + 1}
                                                </th>

                                                <td>{recommendation.item.name}</td>
                                                <td>{Math.round(recommendation.forecastAmount1)}</td>
                                                <td>{Math.round(recommendation.forecastAmount2)}</td>
                                                <td>{Math.round(recommendation.forecastAmount3)}</td>



                                            </tr>
                                        )) : <tr><td colSpan="3">Нет данных для отображения</td></tr>}
                                    </tbody>
                                </table>
                                <textarea
                                    style={{ width: '700px' }}
                                    value={textRecommendations}
                                    rows="10"
                                    cols="50"
                                    readOnly
                                ></textarea>
                            </ul>
                            <ul>
                                <button
                                    className="btn btn-dark"
                                    style={{ width: '140px' }}
                                    onClick={loadRecommendations}
                                >
                                    Сформировать
                                </button>

                            </ul>
                            <ul>
                                <button
                                    className="btn btn-dark"
                                    style={{ width: '130px' }}
                                    onClick={downloadPDF}
                                >
                                    Скачать PDF
                                </button>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}