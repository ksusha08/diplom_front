import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Adminmenu from "../menu/AdminMenu";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import '../styles/adminmenu.css';

export default function Home() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8081/activeusers");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8081/user/${id}`);
    loadUsers();
  };

  const onBan = async (user) => {
    user.status = "заблокирован";
    await axios.put(`http://localhost:8081/user/${user.id}`, user);
    loadUsers();

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
                <th scope="col">Логин</th>
                <th scope="col">Роль</th>
                <th scope="col">
                  <Link
                    className="btn btn-dark ml-0 "
                    to={`/adduser`}
                    style={{ float: "right" }}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Link>
                  Действие</th>
              </tr>
            </thead>
            <tbody>
              {users.filter(user => !user.roles.includes("ADMIN")).map((user, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.username}</td>
                  <td>{user.roles}</td>
                  <td>
                    <Link
                      className="btn btn-outline-dark mx-2"
                      to={`/viewuser/${user.id}`}
                    >
                      <FontAwesomeIcon icon={faAddressCard} />
                    </Link>
                    <Link
                      className="btn btn-outline-dark mx-2"
                      to={`/edituser/${user.id}`}
                    >
                      <FontAwesomeIcon icon={faUserPen} />
                    </Link>
                    <button
                      className="btn btn-dark mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      <FontAwesomeIcon icon={faUserMinus} />
                    </button>

                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => onBan(user)}
                    >
                      Заблокировать
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