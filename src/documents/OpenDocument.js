import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorModal from "../context/ErrorModal";

import '../styles/style.css';


export default function OpenDocument() {
  const [error, setError] = useState(null);

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);



  const { id } = useParams();
  const [amount, setAmount] = useState('');
  const [documentInfo, setDocumentInfo] = useState([]);

  const [document, setDocument] = useState([]);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const loadItems = async () => {
    const result = await axios.get("http://localhost:8081/items");
    const itemsWithStorehouseQuantity = await Promise.all(result.data.map(async (item) => {
      const storehouseItem = await axios.get(`http://localhost:8081/storehouseitembystorageanditem/${item.id}/${id}`);
      return {
        ...item,
        storehouseQuantity: storehouseItem.data.amount
      };
    }));
    setItems(itemsWithStorehouseQuantity);
  };

  useEffect(() => {
    loadItems();
    loadDocumentInfo();
    loadDocument();
  }, []);

  const loadDocumentInfo = async () => {
    const result = await axios.get(`http://localhost:8081/documentInfo/findByDocId/${id}`);
    setDocumentInfo(result.data);
  };

  const loadDocument = async () => {
    const result = await axios.get(`http://localhost:8081/document/${id}`);
    setDocument(result.data);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (document.type=="расход" && selectedItem && amount > selectedItem.storehouseQuantity) {
      setError("Недостаточно товаров на складе.");
      return;
    }


    const newDocumentInfo = {
      amount,
      coefficient_price: document.coefficient * selectedItem.discountPrice,
      summ: (amount * document.coefficient * selectedItem.discountPrice).toFixed(1)
    };
    setError(null);
    const result = await axios.post(
      `http://localhost:8081/documentInfo/${id}/${selectedItem.id}/`,
      newDocumentInfo
    );
    setSelectedItem(null);
    setAmount("");

    loadItems();
    loadDocumentInfo();
  };


  const deleteInfo = async (id) => {
    await axios.delete(`http://localhost:8081/documentInfo/${id}`);
    loadDocumentInfo();
    loadItems();
  };

  return (

    <div className="main-container">
      <Link
        className="btn btn-dark ml-0 "
        to={`/documents`}
        style={{ float: "right" }}
      >
        Назад
      </Link>

      <div className="container">
        {/* Display error modal if error exists */}
        {error && (
          <ErrorModal message={error} onClose={() => setError(null)} />
        )}
        {/* ... (rest of your JSX) ... */}
      </div>

      <div className="row" style={{ marginTop: '30px', height: '86.8vh' }}>


        <div className="col-md-6">

          <div className="container">
            <h3>Товары</h3>

            <div className="container">


              <div className="d-flex justify-content-between mb-3" >
                <div className='mb-3'>
                  <label htmlFor="vendoreCodeInput">Артикул товара:</label>
                  <input
                    type="text"
                    id="vendoreCodeInput"
                    name="vendoreCode"
                    className="form-control"
                    value={selectedItem ? selectedItem.vendoreCode : ""}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="discountPriceInput">Цена за единицу:</label>
                  <input
                    type="text"
                    id="discountPriceInput"
                    name="discountPrice"
                    className="form-control"
                    value={selectedItem ? selectedItem.discountPrice : ""}
                    readOnly
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="number">Количество:</label>
                  <input
                    type="text"
                    id="number"
                    name="number"
                    className="form-control"
                    value={amount}
                    onChange={handleAmountChange}
                  />
                </div>

                <button type='submit' className='btn btn-dark  custom-height' onClick={handleSubmit}
                  disabled={!selectedItem || !amount} >
                  Добавить
                </button>

              </div>
            </div>

            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <div className="py-4 d-flex justify-content-end">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">ИД</th>
                      <th scope="col">Название</th>
                      <th scope="col">Артикул</th>
                      <th scope="col">Цена</th>
                      <th scope="col">Общее Количество</th>
                      <th scope="col">Количество на складе</th>
                      <th scope="col">Изображение</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{item.id}</th>
                        <td>{item.name}</td>
                        <td>{item.vendoreCode}</td>
                        <td>{item.discountPrice}</td>
                        <td>{item.number}</td>
                        <td>{item.storehouseQuantity}</td>
                        <td>
                          {item.photos && (
                            <img
                              src={`http://localhost:8081${item.photosImagePath}`}
                              alt={item.name}
                              height="50"
                            />
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-dark ml-0"
                            onClick={() => {
                              setSelectedItem(item);
                            }}
                            disabled={document.status === "проведен"}
                          >
                            Выбрать
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

        <div className="col-md-6">
          <div className="container">
            <h3>Содержимое документа</h3>
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
              <div className="py-4 d-flex justify-content-end">
                <table className="table border shadow">
                  <thead>
                    <tr>
                      <th scope="col">Товар</th>
                      <th scope="col">Количество</th>
                      <th scope="col">Цена</th>
                      <th scope="col">Цена c коэффициентом</th>
                      <th scope="col">Сумма</th>
                      <th scope="col">Действие</th>
                    </tr>
                  </thead>
                  <tbody>

                    {documentInfo.map((info, index) => (
                      <tr key={index}>

                        <td>{info.item.name}</td>
                        <td>{info.amount}</td>
                        <td>{info.item.discountPrice}</td>
                        <td>{(info.coefficient_price).toFixed(1)}</td>
                        <td>{(info.summ).toFixed(1)}</td>

                        <td>
                          <button
                            className="btn btn-outline-dark"
                            onClick={() => deleteInfo(info.id)}
                            disabled={document.status === "проведен"}
                          >
                            <FontAwesomeIcon icon={faTrash} />
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



      </div>
    </div>

  );
}