import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../menu/MainMenu";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/style.css';

export default function Items() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
  const searchItems = async () => {
    const result = await axios.get(`http://localhost:8081/search_items/${searchTerm}`);
    setItems(result.data);
  };

  return (
    <div className="items-container">
      <Menu />


      <div className="search-items" >
        
        <input
          type="text"
          placeholder="Наименование номеклатуры"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "400px" }}
        />
        <button
          className="btn btn-dark mx-2"
          onClick={searchItems}
        >
          Поиск
        </button>
        <button
          className="btn btn-dark ml-1 "
          onClick={() => loadItems()}
          style={{ float: "right" }}
        >
          <FontAwesomeIcon icon={faRedo} />
        </button>

        <Link
          className="btn btn-dark ml-1 "
          to={`/additem`}
          style={{ marginLeft: "900px", width: "220px" }}
        >
          Добавить номенклатуру
        </Link>
      </div>



      <div className="item-container">

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
                  <p className="card-text">Количество: {item.number} </p>
                  <p className="card-text">Категория: {item.category.name}</p>
                </div>
                <div className="card-footer">
                  <Link
                    className="btn btn-outline-dark mx-2"
                    to={`/edititem/${item.id}`}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Link>
                  <button
                    className="btn btn-outline-dark mx-2"
                    onClick={() => deleteItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <Link
                    className="btn btn-outline-dark mx-2"
                    to={`/storehouseitems/${item.id}`}
                  >
                    <FontAwesomeIcon icon={faWarehouse} />
                  </Link>
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </div>

  );
}
