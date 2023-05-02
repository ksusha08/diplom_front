
import React from "react";
import { Link } from "react-router-dom";
import '../styles/menu.css';
import { faDolly } from "@fortawesome/free-solid-svg-icons";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";

export default function AdminMenu() {
  return (
    <nav className="nav-style-">
    <div className="menu-style">
      <li className="nav-item" data-text="Справочнки поставщиков">
        <Link to="/suppliers" className="nav-link">
        <FontAwesomeIcon icon={faAddressBook} />
        </Link>
      </li>

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

      <li className="nav-item" data-text="Документ">
        <Link to="/reports" className="nav-link">
        <FontAwesomeIcon icon={faFileDownload} />
        </Link>
      </li>
      
      <li className="nav-item-main-exit" data-text="Документ">
        <Link to="/" className="nav-link">
        <FontAwesomeIcon icon={faRightFromBracket} />
        </Link>
      </li>

      
     
    </div>
    </nav>

  );
}