import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../menu/MainMenu";
import ReportMenu from "../menu/ReportMenu";
import '../styles/style.css';
import { PieChart, Pie, Cell } from 'recharts';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Reports() {

    const [documents, setDocuments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartData, setChartData] = useState([]);
    const [isReportGenerated, setIsReportGenerated] = useState(false);


    const { id } = useParams();


    const generateReport = async () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const result = await axios.get(`http://localhost:8081/balance_report/${start}/${end}`);
        setDocuments(result.data);

        const chartData = result.data.map(document => ({
            name: document.idinfo,
            incomeAmount: document.incomeAmount,
            expenseAmount: document.expenseAmount,
            number: document.number,
        }));
        setChartData(chartData);
        setIsReportGenerated(true);
    };
    
    function saveReportToExcel() {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (!isReportGenerated) {
            alert('Отчет не был создан!');
            return;
        }

        const result = documents.map(document => ({
            Товар: document.idinfo,
            Приход: document.incomeAmount,
            Расход: document.expenseAmount,
            Остаток: document.number
        }));

        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Отчет');
        XLSX.writeFile(workbook, `Отчет о приходах и расходах_${start.toLocaleDateString()}_${end.toLocaleDateString()}.xlsx`);
    }
    return (
        <div className="items-container" >
            <Menu />
            <ReportMenu />
            

            <div className="search">
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


        
                <div className="table-wrapper-scroll-y my-custom-scrollbar"  style={{  width:'1200px', marginLeft:'100px'}}>
                    <div className="py-2 d-flex justify-content-start">

                        <table className="table border shadow">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Товар</th>
                                    <th scope="col">Приход</th>
                                    <th scope="col">Расход</th>
                                    <th scope="col">Остаток</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map((document, index) => (
                                    <tr>
                                        <th scope="row" key={index}>
                                            {index + 1}
                                        </th>
                                        <td>{document.idinfo}</td>
                                        <td>{document.incomeAmount}</td>
                                        <td>{document.expenseAmount}</td>
                                        <td>{document.number}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
               
               
            </div>

        
    );
}