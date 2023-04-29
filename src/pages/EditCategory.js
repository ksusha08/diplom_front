import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";
import '../styles/style.css';

export default function EditCategory() {

  let navigate=useNavigate();

  const {id} = useParams()

  const [category,setCategory]= useState({
    name:"",
    description:"",
  });

  const{name,description}=category

  const onInputChange= async (e)=>{

    setCategory({...category,[e.target.name]:e.target.value});

  };

  useEffect(()=>{
    loadCategory()
  }, []);

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.put(`http://localhost:8081/category/${id}`,category);
    navigate("/category");

  };

  const loadCategory = async ()=>{
    const result = await axios.get(`http://localhost:8081/category/${id}`);
    setCategory(result.data);
  };

  return (
 
    <div className=" main-container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Редактировать категорию</h2>


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
            <label htmFor="Name" className="form-label">Название</label>
            <textarea
              type={"text"}
              class="form-control"
              placeholder="Введите описание"
              name="description" 
              value={description}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

    



          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/category">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  
  )
}