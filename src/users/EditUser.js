import React, {useEffect,useState} from 'react';
import axios from "axios";
import {Link,useNavigate,useParams} from "react-router-dom";
import '../styles/adminmenu.css';

export default function EditUser() {

  let navigate=useNavigate();

  const {id} = useParams()

  const [user,setUser]= useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    username: "",
    password:"",
    roles: ""
  });

  const { name, surname,patronymic,email,username, password, role } = user;

  const onInputChange= async (e)=>{

   setUser({...user,[e.target.name]:e.target.value});

  };

  useEffect(()=>{
    loadUser()
  }, []);

  const onSubmit= async (e)=>{

    e.preventDefault();
    await axios.put(`http://localhost:8081/user/${id}`,user);
    navigate("/activeusers");

  };

  const loadUser = async ()=>{
    const result = await axios.get(`http://localhost:8081/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container admin-background">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Редактировать пользователя</h2>


          <form onSubmit={(e)=>onSubmit(e)}>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Имя</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите имя пользователя"
              name="name" 
              value={name}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Фамилия</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите фамилию"
              name="surname" 
              value={surname}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

          <div className="mb-3">
            <label htmFor="Name" className="form-label">Отчество</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите отчество"
              name="patronymic" 
              value={patronymic}
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
            <label htmFor="Userame" className="form-label">Логин</label>
            <input
              type={"text"}
              class="form-control"
              placeholder="Введите логин"
              name="username" 
              value={username}
              onChange={(e)=>onInputChange(e)}
              />
          </div>

      

          <button type="submit" className="btn btn-outline-dark">Редактировать</button>
          <Link  className="btn btn-outline-danger mx-2" to ="/activeusers">Отмена</Link>
          </form>
        </div>
      </div>
    </div>
  )
}