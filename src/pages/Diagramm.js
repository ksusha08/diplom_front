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

    function IncomeChart({ data }) {
        const COLORS = ['turquoise', 'aquamarine', 'navy', 'blue','cornflowerblue', 'deepskyblue', 'cyan', 'steelblue', 'teal', 'royalblue', 'dodgerblue'];
        const incomeData = data.map(document => ({
            name: document.idinfo,
            value: document.incomeAmount,
        }));

        return (
            <PieChart width={500} height={500}>
                <Pie
                    data={incomeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={160}
                    fill="#8884d8"
                    label={(entry) => entry.name}
                >
                    {incomeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        );
    }
    
    function ExpenseChart({ data }) {
        const COLORS = ['#e22529', '#f9ce00', '#fc0514','#790307', '#feeb31', '#c51d90', '#df2185', '#c65dcf', '#8f71ed', '#9c4bce'];
        const expenseData = data.map(document => ({
            name: document.idinfo,
            value: document.expenseAmount,
        }));

        return (
            <PieChart width={500} height={500}>
                <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={160}
                    fill="#8884d8"
                    label={(entry) => entry.name}
                >
                    {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        );
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
                    Построить диаграммы
                </button>

            </div>

            <div style={{ display: 'flex' }}>
                {isReportGenerated && (
                    <>
                        <div style={{ margin: '0 auto' }}>
                            <h2>Приходы</h2>
                            <IncomeChart data={documents} />
                        </div>
                        <div style={{ margin: '0 auto' }}>
                            <h2>Расходы</h2>
                            <ExpenseChart data={documents} />
                        </div>
                    </>
                )}
            </div>


        </div>


    );
}