import React, {useState} from 'react';
import axios from "axios";
import {Link,useNavigate} from "react-router-dom";
import '../styles/style.css';

export default function AddSupplier() {
  const [error, setError] = useState('');
  let navigate=useNavigate()

  const [supplier,setSupplier]= useState({
    name:"",
    email:"",
    address:"",
    coefficient: ""
  });

  const{name,email,address,coefficient}=supplier

  const onInputChange= async (e)=>{

   setSupplier({...supplier,[e.target.name]:e.target.value});

  };

  const onSubmit= async (e)=>{
    e.preventDefault();
    if (!name || !email || !address || !coefficient|| isNaN(parseFloat(coefficient)) ) {
      setError('Заполните правильно все поля!');
      return;
    }

    await axios.post("http://localhost:8081/supplier",supplier);
    navigate("/suppliers");

  };

  return (
    <div className=" main-container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Добавить контрагента</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Имя контрагента</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите имя"
              name="name" 
              value={name}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Email" className="form-label">Почта</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите почту"
              name="email" 
              value={email}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Address" className="form-label">Адрес</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите адрес"
              name="address" 
              value={address}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Coefficient" className="form-label">Коэффициент к цене</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите коэффициент к цене"
              name="coefficient" 
              value={coefficient}
              onChange={(e)=>onInputChange(e)}
              />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-outline-dark">Добавить</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/suppliers">Отмена</Link>
          </form>
        </div>
      </div>
    </div>

  )
}
