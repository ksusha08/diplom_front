import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

export default function Navbar() {

    return (
        <form className="error-form d-flex justify-content-center align-items-center" >
            <div  >
            <button type="submit" >Войти</button>
            </div>
         
      </form>
    )
  }
  