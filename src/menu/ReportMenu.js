import React from "react";
import { Link } from "react-router-dom";

export default function AdminMenu() {
    return (

        <div className="report-menu">
            <ul>
                <li className="report-menu-li">
                    <Link to="/adcanalysis">Анализ</Link>
                </li>
                {/* <li className="report-menu-li">
                    <Link to="/reports">Отчет по продажам</Link>
                </li> */}
                <li className="report-menu-li">
                    <Link to="/report2">Отчет о приходах и расходах</Link>
                </li>
                <li className="report-menu-li">
                    <Link to="/diagramm">Статистика приходов и расходов</Link>
                </li>
                <li className="report-menu-li">
                    <Link to="/calculation">Расчет запасов</Link>
                </li>
                <li className="report-menu-li">
                    <Link to="/recommendations">Рекомендации</Link>
                </li>
            </ul>
        </div>
    );
}