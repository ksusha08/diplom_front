import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../menu/MainMenu";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Reports() {
    const [documents, setDocuments] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartData, setChartData] = useState([]);

    const generateReport = async () => {
        setDocuments([]);
        const start = new Date(startDate);
        const end = new Date(endDate);
        const result = await axios.get(`http://localhost:8081/report/${start}/${end}`);
        setDocuments(result.data);
        const chartData = result.data.map(document => ({
            name: document.item.name,
            amount: document.amount,
            summ: document.summ
        }));
        setChartData(chartData);

    };
    function saveReportToExcel() {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const result = documents.map(document => ({
            Товар: document.item.name,
            Количество: document.amount,
            Сумма: document.summ
        }));
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчет');
        XLSX.writeFile(workbook, `Отчет по продажам_${start.toLocaleDateString()}_${end.toLocaleDateString()}.xlsx`);
    }
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
                    Создать отчет
                </button>
                <button className="btn btn-dark mx-2" style={{ width: '100px' }} onClick={saveReportToExcel}>
                    Сохранить
                </button>
            </div>
            <div className="report-container">
                <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ width: '800px' }}>
                    <div className="py-2 d-flex justify-content-start">

                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">Номенклатура</th>
                                    <th scope="col">Количество</th>
                                    <th scope="col">Сумма</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.length > 0 ? documents.map((document, index) => (
                                    <tr key={index}>
                                        <td>{document.item.name}</td>
                                        <td>{document.amount}</td>
                                        <td>{document.summ}</td>
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
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="summ" name="Cумма" fill="#F84E77" />
                    </BarChart>
                </div>
            </div>
            </div>
        </div>
    );

}