import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../menu/MainMenu";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import '../styles/analysisstyle.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function Reports() {
    const [documents, setDocuments] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [matrix, setMatrix] = useState([]);
    const [showMatrixModal, setShowMatrixModal] = useState(false);

    const abcCategories = ['A', 'B', 'C'];
    const xyzCategories = ['X', 'Y', 'Z'];

    const generateReport = async () => {
        setDocuments([]);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const result = await axios.get(`http://localhost:8081/abcreport/${start}/${end}`);
        setDocuments(result.data);
    };



    useEffect(() => {
        generateMatrix();
    }, [documents]);

    const generateMatrix = () => {
        const matrixData = [];

        // Инициализируем матрицу
        for (const abcCategory of abcCategories) {
            const row = [];
            for (const xyzCategory of xyzCategories) {
                row.push([]);
            }
            matrixData.push(row);
        }

        // Заполняем матрицу данными из documents
        for (const document of documents) {
            const abcCategoryIndex = abcCategories.indexOf(document.abcCategory);
            const xyzCategoryIndex = xyzCategories.indexOf(document.xyzCategory);

            if (abcCategoryIndex !== -1 && xyzCategoryIndex !== -1) {
                matrixData[abcCategoryIndex][xyzCategoryIndex].push(document.item.name);
            }
        }

        // Обновляем состояние матрицы
        setMatrix(matrixData);
    };

    const handleShowMatrixModal = () => {
        setShowMatrixModal(true);
    };

    const handleCloseMatrixModal = () => {
        setShowMatrixModal(false);
    };


    return (
        <div className="items-container" >
            <Menu />

            <div className="category-container">
            <ReportMenu />
                <div className="search-analysis">
                    <input
                        type="date"
                        placeholder="Дата начала"
                        className="form-control"
                        value={startDate}

                        onChange={(e) => setStartDate(e.target.value)}
                    />
                    <input
                        type="date"
                        placeholder="Дата окончания"
                        className="form-control"
                        value={endDate}

                        onChange={(e) => setEndDate(e.target.value)}
                    />
                    <button className="btn btn-dark mx-2" style={{ width: '600px' }} onClick={generateReport}>
                        Просмотреть
                    </button>

                    <button className="btn btn-dark mx-2" style={{ width: '600px' }} onClick={handleShowMatrixModal}>
                        Матрица
                    </button>
                </div>
                <div className="report-container">
                    <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ width: '1300px' }}>
                        <div className="py-2 d-flex justify-content-start">

                            <table className="table table-bordered shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">Товар</th>
                                        <th scope="col">Категория ABC</th>
                                        <th scope="col">Категория XYZ</th>
                                        <th scope="col">Продажи</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.length > 0 ? documents.map((document, index) => (
                                        <tr key={index} className={`abc-category-${document.abcCategory}`}>
                                            <td>{document.item.name}</td>
                                            <td>{document.abcCategory}</td>
                                            <td>{document.xyzCategory}</td>
                                            <td>{document.sales}</td>
                                        </tr>
                                    )) : <tr><td colSpan="3">Нет данных для отображения</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>

                <Modal show={showMatrixModal} onHide={handleCloseMatrixModal} dialogClassName="custom-modal-dialog">
                    <Modal.Header closeButton>
                        <Modal.Title>Матрица ABC-XYZ</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >
                        <table className="table table-bordered shadow">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">X</th>
                                    <th scope="col">Y</th>
                                    <th scope="col">Z</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matrix.map((row, abcIndex) => (
                                    <tr key={abcIndex}>
                                        <th scope="row">{abcCategories[abcIndex]}</th>
                                        {row.map((xyzCategory, xyzIndex) => (
                                            <td key={xyzIndex}>
                                                {xyzCategory.map((productName, productIndex) => (
                                                    <div key={productIndex} className={`product-category-${abcCategories[abcIndex]}-${xyzCategories[xyzIndex]}`}>
                                                        {productName}
                                                    </div>
                                                ))}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Modal.Body>

                </Modal>
            </div>
        </div>
    );

}