import React from "react";
import { Link } from "react-router-dom";
import '../styles/style.css';
import '../App.css';
import { faUserGear} from "@fortawesome/free-solid-svg-icons";
import { faUserAltSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function AdminMenu() {
  return (
    <nav className="nav-style-admin">
      <div className="menu-style-admin">
        
      <li className="nav-item-admin">
        <Link to="/activeusers" className="nav-link">
        <FontAwesomeIcon icon={faUserGear} />  Пользователи
        </Link>
      </li>
      <li className="nav-item-admin">
        <Link to="/applications" className="nav-link">
          <FontAwesomeIcon icon={faIdCard} />        Заявки
        </Link>
      </li>
      <li className="nav-item-admin">
        <Link to="/bannedusers" className="nav-link">
        <FontAwesomeIcon icon={faUserAltSlash} /> Черный список
        </Link>
      </li>

      <li className="nav-item-admin-exit">
        <Link to="/" className="nav-link">
        <FontAwesomeIcon icon={faRightFromBracket} /> Выход
        </Link>
      </li>

    </div>
    </nav >
  );
}