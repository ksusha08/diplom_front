import React from "react";
import { Link } from "react-router-dom";

import { faUserGear } from "@fortawesome/free-solid-svg-icons";
import { faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function AdminMenu() {
    return (

        <div className="report-menu">
            <ul>
                <li className="report-menu-li">
                    <Link to="/reports">Отчет по продажам</Link>
                </li>
                <li className="report-menu-li">
                    <Link to="/report2">Отчет о приходах и расходах</Link>
                </li>
                <li className="report-menu-li">
                    <Link to="/diagramm">Диаграммы приходов и расходов</Link>
                </li>
            </ul>
        </div>
    );
}