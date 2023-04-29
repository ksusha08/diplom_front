import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../App.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";



function Login() {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        patronymic: "",
        email: "",
        username: "",
        password: "",
        status: "заявка",
        roles: ["USER"]
    });

    const { name, surname, patronymic, email, username, password, role } = user;

    const onInputChange = async (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:8081/user", user).then((response) => {

        navigate("/");

        }).catch((error) => {
            setError('Такое имя пользователя уже зарегистрировано!');
        });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form d-flex justify-content-center align-items-center" >
            <div className=" p-4 mt-5.5 register-form-wrapper" >

                <div className="pageSwitcher">

                    <NavLink
                        exact
                        to="/"
                        activeClassName="pageSwitcherItem-active"
                        className="pageSwitcherItem"
                    >
                        Авторизация
                    </NavLink>
                </div>

                <h2 className="login-text text-center m-4">Регистрация</h2>

                <div className="mb-3 position-relative">
                    <label htmlFor="Name" className="form-label visually-hidden">Имя</label>
                    <input
                        type={"text"}
                        class="form-control ps-5"
                        placeholder="Введите имя"
                        name="name"
                        value={name}
                        onChange={(e) => onInputChange(e)}
                    />
                    <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="Surname" className="form-label visually-hidden">Фамилия</label>
                    <input
                        type={"text"}
                        class="form-control ps-5"
                        placeholder="Введите фамилию"
                        name="surname"
                        value={surname}
                        onChange={(e) => onInputChange(e)}
                    />
                     <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="Patronymic" className="form-label visually-hidden">Отчество</label>
                    <input
                        type={"text"}
                        class="form-control ps-5"
                        placeholder="Введите отчество"
                        name="patronymic"
                        value={patronymic}
                        onChange={(e) => onInputChange(e)}
                    />
                     <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="Email" className="form-label visually-hidden">Почта</label>
                    <input type={"text"}
                        className="form-control ps-5"
                        placeholder="Введите почту"
                        name="email"
                        value={email}
                        onChange={(e) => onInputChange(e)}
                    />
                     <FontAwesomeIcon icon={faEnvelope} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="UserName" className="form-label visually-hidden">Логин</label>
                    <input
                        type={"text"}
                        class="form-control ps-5"
                        placeholder="Введите имя пользователя"
                        name="username"
                        value={username}
                        onChange={(e) => onInputChange(e)}
                    />
                     <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                </div>

                <div className="mb-3 position-relative">
                    <label htmlFor="Password" className="form-label visually-hidden">Пароль</label>
                    <input type={"text"}
                        className="form-control ps-5"
                        placeholder="Введите пароль"
                        name="password"
                        value={password}
                        onChange={(e) => onInputChange(e)}
                    />
                     <FontAwesomeIcon icon={faLock} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
                </div>


                {error && <div className="alert alert-danger">{error}</div>}

                <button type="submit" className="btn btn-outline-light login-form-button">Зарегистрироваться</button>
            </div>
        </form>
    );
}

export default Login;