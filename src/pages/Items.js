import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../menu/MainMenu";
import { faEdit  } from "@fortawesome/free-solid-svg-icons";
import { faTrash  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/style.css';

export default function Items() {
  const [items, setItems] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8081/items");
    setItems(result.data);
  };

  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:8081/item/${id}`);
    loadItems();
  };

  return (
    <div className=" items-container">
      <Menu />
   
      <Link
        className="btn btn-dark ml-0 "
        to={`/additem`}
        style={{ float: "right" }}
      >
        Добавить товар
      </Link>

     
        <div className="row">
          {items.map((item, index) => (
            <div className="col-md-3 mb-3" key={item.id}>
              <div className="card h-100">
                {item.photos && (
                  <img
                    src={`http://localhost:8081${item.photosImagePath}`}
                    alt={item.name}
                    className="card-img-top"
                  />
                )}
                <div className="card-body">
                  <h2 className="card-title">Наименование: {item.name}</h2>
                  <p className="card-text">Артикул: {item.vendoreCode}</p>
                  <p className="card-text">Цена: {item.discountPrice} BYN</p>
                  <p className="card-text">Количесвто: {item.number} </p>
                  <p className="card-text">Описание: {item.description}</p>
                </div>
                <div className="card-footer">
                  <Link
                    className="btn btn-outline-dark mx-2"
                    to={`/edititem/${item.id}`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    className="btn btn-outline-dark"
                    onClick={() => deleteItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
   
   
  );
}
