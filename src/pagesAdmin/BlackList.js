import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams , useNavigate} from "react-router-dom";
import Adminmenu from "../menu/AdminMenu";
import '../styles/adminmenu.css';

export default function Home() {
  const [users, setUsers] = useState([]);
  const { id } = useParams();
  let navigate=useNavigate();

  const [user,setUser]= useState({
    name: "",
    surname: "",
    patronymic: "",
    email: "",
    username: "",
    password:"",
    status:"",
    roles: ""
  });

  const { name, surname,patronymic,email,username, password, role ,status} = user;

  const onSubmit= async (user)=>{

    user.status = "активен";
    await axios.put(`http://localhost:8081/user/${user.id}`,user);
    loadUsers();

  };


  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8081/blacklist");
    setUsers(result.data);
  };


  return (
    <div className="admin-background">
      <Adminmenu />

      
      <div className="container">
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">№</th>
                <th scope="col">Имя</th>
                <th scope="col">Фамилия</th>
                <th scope="col">Отчество</th>
                <th scope="col">Почта</th>
                <th scope="col">Логин</th>
                <th scope="col">Действие</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.patronymic}</td>
                  <td>{user.email}</td>
                  <td>{user.username}</td>

                  <td>
                    <button
                      className="btn btn-disban mx-2"
                      onClick={() => onSubmit(user)}
                    >
                      Разблокировать
                    </button>
                
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}