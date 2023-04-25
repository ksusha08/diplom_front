import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";
import { faUserPen  } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    const result = await axios.get("http://localhost:8081/suppliers");
    setSuppliers(result.data);
  };

  const deleteSupplier = async (id) => {
    await axios.delete(`http://localhost:8081/supplier/${id}`);
    loadSuppliers();
  };

  return (
    <div>
      <Menu />
      <Link
        className="btn btn-dark ml-0 "
        to={`/addsupplier`}
        style={{ float: "right" }}
      >
        Добавить поставщика
      </Link>

      <div className="container">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">ИД</th>
                  <th scope="col">Имя</th>
                  <th scope="col">Почта</th>
                  <th scope="col">Адрес</th>
                  <th scope="col">Коэффициент к цене</th>
                  <th scope="col">Действие</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier, index) => (
                  <tr>
                    <th scope="row" key={index}>
                      {index + 1}
                    </th>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.address}</td>
                    <td>{supplier.coefficient}</td>
                    <td>
                      <Link
                        className="btn btn-outline-dark mx-2"
                        to={`/editsupplier/${supplier.id}`}
                      >
                        <FontAwesomeIcon icon={faUserPen} />
                      </Link>
                      <button
                        className="btn btn-dark mx-2"
                        onClick={() => deleteSupplier(supplier.id)}
                      >
                        <FontAwesomeIcon icon={faUserMinus} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}