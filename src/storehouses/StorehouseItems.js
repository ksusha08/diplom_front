import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../menu/MainMenu";
import { Link, useParams } from "react-router-dom";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { Modal, Table, Button, Form } from 'react-bootstrap';

export default function StorehouseItems() {
    const [documents, setDocuments] = useState([]);

    const [chartData, setChartData] = useState([]);

    const [modalShow, setModalShow] = useState(false); // Состояние модального окна
    const [editedDocument, setEditedDocument] = useState(null);

    const { id } = useParams();

    const loadDocuments = async () => {
        setDocuments([]);
        const result = await axios.get(`http://localhost:8081/storehouseitemsbyid/${id}`);
        setDocuments(result.data);
        const chartData = result.data.map(document => ({
            name: document.storehouse.name,
            amount: document.amount,
            min_amount: document.min_amount,
            reorder_level:document.reorder_level,
            max_amount: document.max_amount,
        }));
        setChartData(chartData);

    };
    useEffect(() => {
        loadDocuments();
    }, []);


    const editStorehouseItem = (document) => {
        setEditedDocument(document);
        setModalShow(true);
    };

    const updateStorehouseItem = async () => {
        // Вызов API для обновления информации о складе с новыми значениями
        await axios.put(`http://localhost:8081/storehouseitem/${editedDocument.id}`, editedDocument);
        setModalShow(false); // Закрываем модальное окно
        loadDocuments(); // Загружаем данные снова, чтобы обновить таблицу
    };


    return (
        <div className="items-container" >
            <div className="category-container">

                <Link
                    className="btn btn-dark ml-0 "
                    to={`/items`}
                    style={{ float: "right", marginTop: "35px" }}
                >
                    Вернуться Назад
                </Link>

                <div className="report-container">


                    <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ width: '800px' }}>
                        <div className="py-2 d-flex justify-content-start">

                            <table className="table table-bordered shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">Название склада</th>
                                        <th scope="col">Текущее количество</th>
                                        <th scope="col">Минимальный запас</th>
                                        <th scope="col">Точка заказа</th>
                                        <th scope="col">Максимальный запас</th>
                                        <th scope="col">Действие</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {documents.length > 0 ? documents.map((document, index) => (
                                        <tr key={index}>
                                            <td>{document.storehouse.name}</td>
                                            <td>{document.amount}</td>
                                            <td>{document.min_amount}</td>
                                            <td>{document.reorder_level}</td>
                                            <td>{document.max_amount}</td>
                                            <td>
                                                <button className="btn btn-outline-dark mx-2" onClick={() => editStorehouseItem(document)}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : <tr><td colSpan="3">Нет данных для отображения</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="chart-wrapper">
                        <BarChart
                            width={800}
                            height={500}
                            data={chartData}
                            margin={{ top: 43, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="min_amount" name="MIN количество" fill="#a3b18a" />
                            <Bar dataKey="reorder_level" name="Точка заказа" fill="#F84E77" />
                            <Bar dataKey="amount" name="Текущее количество" fill="#1baaa0" />
                            <Bar dataKey="max_amount" name="MAX количество" fill="#a3b18a" />
                        </BarChart>
                    </div>

                </div>

                <Modal show={modalShow} onHide={() => setModalShow(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Управление уровнем запаса</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editedDocument && (
                            <Form>
                                <Form.Group controlId="minAmount">
                                    <Form.Label>Минимальное количество:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={editedDocument.min_amount}
                                        onChange={(e) =>
                                            setEditedDocument({
                                                ...editedDocument,
                                                min_amount: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="reorder_level">
                                    <Form.Label>Точка заказа:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={editedDocument.reorder_level}
                                        onChange={(e) =>
                                            setEditedDocument({
                                                ...editedDocument,
                                                reorder_level: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                                <Form.Group controlId="maxAmount">
                                    <Form.Label>Максимальное количество:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        value={editedDocument.max_amount}
                                        onChange={(e) =>
                                            setEditedDocument({
                                                ...editedDocument,
                                                max_amount: e.target.value,
                                            })
                                        }
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setModalShow(false)}>
                            Закрыть
                        </Button>
                        <Button variant="primary" onClick={updateStorehouseItem}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );

}