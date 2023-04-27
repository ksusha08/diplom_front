import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import '../App.css';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import { HashRouter as Router, Route, NavLink } from "react-router-dom";



function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8081/loginuser', { username, password })
      .then((response) => {

        if (response.data.roles.includes('ADMIN')) {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home');
        } else {
          localStorage.setItem('user', JSON.stringify(response.data));
          navigate('/main');
        }
      })
      .catch((error) => {
        setError('Данные введены неверно!');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form d-flex justify-content-center align-items-center" >
      <div className=" p-4 mt-5.5 login-form-wrapper" >

        <div className="pageSwitcher">
             
              <NavLink
                exact
                to="/register"
                activeClassName="pageSwitcherItem-active"
                className="pageSwitcherItem"
              >
                Регистрация
              </NavLink>
            </div>

        <h2 className="login-text text-center m-4">Авторизация</h2>

        <div className="mb-3 position-relative">
          <label htmlFor="username" className="form-label visually-hidden">Имя пользователя:</label>
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Введите имя пользователя"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <FontAwesomeIcon icon={faUser} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
        </div>

        <div className="mb-3 position-relative">
          <label htmlFor="password" className="form-label visually-hidden">Пароль:</label>
          <input
            type="password"
            className="form-control ps-5"
            placeholder="Введите пароль"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FontAwesomeIcon icon={faLock} className="position-absolute top-50 start-0 translate-middle-y ms-2" />
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <button type="submit" className="btn btn-outline-light login-form-button">Войти</button>
      </div>
    </form>
  );
}

export default Login;