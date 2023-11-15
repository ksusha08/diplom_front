import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";
import '../styles/style.css';

export default function EditStorehouse() {

  let navigate=useNavigate();

  const {id} = useParams()

  const [storehouse,setStorehouse]= useState({
    name: "",
        address: "",
        max_capacity: ""
  });

  const { name, address,max_capacity } = storehouse

  const onInputChange= async (e)=>{

    setStorehouse({...storehouse,[e.target.name]:e.target.value});

  };

  useEffect(()=>{
    loadStorehouse()
  }, []);

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.put(`http://localhost:8081/storehouse/${id}`,storehouse);
    navigate("/storehouse");

  };

  const loadStorehouse = async ()=>{
    const result = await axios.get(`http://localhost:8081/storehouse/${id}`);
    setStorehouse(result.data);
  };

  return (
 
    <div className=" main-container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Редактировать склад</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Название</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите название"
              name="name" 
              value={name}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Адрес</label>
            <textarea
              type={"text"}
              class="form-control"
              placeholder="Введите Адрес"
              name="address" 
              value={address}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Максимальная вместимость</label>
            <textarea
              type={"text"}
              class="form-control"
              placeholder="Максимальная вместимость"
              name="max_capacity" 
              value={max_capacity}
              onChange={(e)=>onInputChange(e)}
              />
          </div>
    

          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/storehouse">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  
  )
}