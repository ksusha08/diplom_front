import React from "react";
import '../styles/menu.css';
import MainMenu from "../menu/MainMenu";

export default function Main() {
  return (
    <div>
      <MainMenu />
      
      <form className="main-background d-flex justify-content-center align-items-center" >
        <div className=" container">
          <div className="py-4">
            <h1></h1>
          </div>
        </div>
      </form>
    </div>

  );
}