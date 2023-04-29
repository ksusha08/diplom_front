import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";
import '../styles/style.css';

export default function EditSupplier() {

  let navigate=useNavigate();

  const {id} = useParams()

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

  useEffect(()=>{
    loadSupplier()
  }, []);

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.put(`http://localhost:8081/supplier/${id}`,supplier);
    navigate("/suppliers");

  };

  const loadSupplier = async ()=>{
    const result = await axios.get(`http://localhost:8081/supplier/${id}`);
    setSupplier(result.data);
  };

  return (
 
    <div className=" main-container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Редактировать контрагента</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Имя</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите имя контрагента"
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
            <label htmFor="Сoefficient" className="form-label">Коэффициент к цене</label>
            <input type={"text"}
              className="form-control"
              placeholder="Введите коэффициен к цене"
              name="coefficient" 
              value={coefficient}
              onChange={(e)=>onInputChange(e)}
              />
          </div>



          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/suppliers">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  
  )
}