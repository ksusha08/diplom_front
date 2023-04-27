import React from "react";
import Menu from "./Menu"; 
import '../styles/style.css';
import '../App.css';

export default function Main() {
  return (
    <div>
      <Menu /> 
      <form className="white-background d-flex justify-content-center align-items-center" >
      <div className=" container">
        <div className="py-4">
          <h1>Добро пожаловать на главную страницу</h1>
        </div>
      </div>
      </form>
    </div>
    
  );
}