
import React from "react";
import { Link } from "react-router-dom";
import '../styles/menu.css';
import { faDolly } from "@fortawesome/free-solid-svg-icons";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons";

export default function AdminMenu() {
  const userRole = JSON.parse(localStorage.getItem("user")).roles;
  return (
    <nav className="nav-style-">
      <div className="menu-style">



        <li className="nav-item" data-text="Справрчник категорий">
          <Link to="/category" className="nav-link">
            <FontAwesomeIcon icon={faBook} />
          </Link>
        </li>

        <li className="nav-item" data-text="Справочнки товаров">
          <Link to="/items" className="nav-link">
            <FontAwesomeIcon icon={faDolly} />
          </Link>
        </li>


        <li className="nav-item" data-text="Документ">
          <Link to="/documents" className="nav-link">
            <FontAwesomeIcon icon={faPaste} />
          </Link>
        </li>

        {userRole.includes('MANAGER') && (
          <li className="nav-item" data-text="Справочнки поставщиков">
            <Link to="/suppliers" className="nav-link">
              <FontAwesomeIcon icon={faAddressBook} />
            </Link>
          </li>
        )}

        {userRole.includes('MANAGER') && (
          <li className="nav-item" data-text="Аналитика">
            <Link to="/reports" className="nav-link">
              <FontAwesomeIcon icon={faChartSimple} />
            </Link>
          </li>
        )}

        <li className="nav-item-main-exit" data-text="Выход">
          <Link to="/" className="nav-link">
            <FontAwesomeIcon icon={faRightFromBracket} />
          </Link>
        </li>



      </div>
    </nav>

  );
}