import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import '../styles/style.css';

export default function EditDocument() {

  let navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState(null);

  const [storehouses, setStorehouses] = useState([]);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedStorehouseId, setSelectedStorehouseId] = useState(null);


  const userRole = JSON.parse(localStorage.getItem("user")).roles;

  const { id } = useParams()

  const [document, setDocument] = useState({
    number: "",
    date: "",
    delivery:"",
    type: "",
    coefficient: "",
    supplier: "",
    storehouse: "",
  });

  const { number, date, delivery,type, coefficient } = document

  const onInputChange = async (e) => {

    setDocument({ ...document, [e.target.name]: e.target.value });

  };

  useEffect(() => {
    loadDocument()
  }, []);


  const onSubmit = async (e) => {

    e.preventDefault();
    let supplierId = selectedProviderId;

    if (!selectedProviderId) {
      supplierId = document.supplier.id;
    }

    let storehouseId = selectedStorehouseId;

    if (!selectedStorehouseId) {
      storehouseId = document.storehouse.id;
    }


    await axios.put(`http://localhost:8081/document/${id}/${supplierId}/${storehouseId}`, document);
    navigate("/documents");

  };

  const loadDocument = async () => {
    const result = await axios.get(`http://localhost:8081/document/${id}`);
    setDocument(result.data);
    
  };

  useEffect(() => {
    const fetchSuppliers = async () => {
      const { data } = await axios.get("http://localhost:8081/suppliers");
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleSelectSupplier = (selectedSupplier) => {
    setSelectedProviderId(selectedSupplier.id);
    setShowModal(false);
  };


  useEffect(() => {
    const fetchStorehouses = async () => {
      const { data } = await axios.get("http://localhost:8081/storehouses");
      setStorehouses(data);
    };
    fetchStorehouses();
  }, []);

  const handleSelectStorehouse = (selectedStorehouse) => {
    setSelectedStorehouseId(selectedStorehouse.id);
    setShowModal2(false);
  };

  return (

    <div className="main-container">
      <div className="row" >
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">

          <h2 className="text-center m-4">Редактировать документ</h2>


          <form onSubmit={(e) => onSubmit(e)}>

            <div className="mb-3">
              <label htmFor="number" className="form-label">Номер</label>
              <input
                type={"text"}
                class="form-control"
                placeholder="Введите номер"
                name="number"
                value={number}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmFor="date" className="form-label">Дата</label>
              <input type={"date"}
                className="form-control"
                placeholder="Введите дату"
                name="date"
                value={date}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmFor="delivery" className="form-label">Время доставки в днях</label>
              <input
                type={"number"}
                class="form-control"
                placeholder="Введите время доставки в днях"
                name="delivery"
                value={delivery}
                onChange={(e) => onInputChange(e)}
              />
            </div>


            <div className="mb-3">
              <label htmlFor="Type" className="form-label">Тип</label>
              <select
                className="form-control"
                name="type"
                value={type}
                onChange={(e) => onInputChange(e)}
              >
                <option value="">Выберите тип</option>
                <option value="приход">Приход</option>
                <option value="расход">Расход</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="id_provider" className="form-label">
                Контрагент
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Выберите контрагента"
                  value={
                    selectedProviderId
                      ? suppliers.find((s) => s.id === selectedProviderId)
                        .name
                      : ""
                  }
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Выбрать
                </button>
              </div>
            </div>


            <div className="mb-3">
              <label htmlFor="id_provider" className="form-label">
                Склад
              </label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Выберите склад"
                  value={
                    selectedStorehouseId
                      ? storehouses.find((s) => s.id === selectedStorehouseId)
                        .name
                      : ""
                  }
                  readOnly
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowModal2(true)}
                >
                  Выбрать
                </button>
              </div>
            </div>

            {userRole.includes('MANAGER') && (
              <div className="mb-3">
                <label htmFor="coefficient" className="form-label">Коэффициент</label>
                <input
                  type={"text"}
                  class="form-control"
                  placeholder="Введите коэффициент"
                  name="coefficient"
                  value={coefficient}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            )}

              <div className="mb-3">
                <button type="submit" className="btn btn-primary me-2">
                  Редактировать
                </button>
                <Link to="/documents" className="btn btn-secondary">
                  Отмена
                </Link>
              </div>


            </form>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Выберите поставщика</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {suppliers.map((supplier) => (
                    <tr
                      key={supplier.id}
                      onClick={() => handleSelectSupplier(supplier)}
                    >
                      <td>{supplier.id}</td>
                      <td>{supplier.name}</td>
                      <td>{supplier.address}</td>
                      <td>{supplier.email}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>

          <Modal show={showModal2} onHide={() => setShowModal2(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Выберите склад</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Название</th>
                    <th>Адрес</th>
                    <th>вместимость</th>
                  </tr>
                </thead>
                <tbody>
                  {storehouses.map((storehouse) => (
                    <tr
                      key={storehouse.id}
                      onClick={() => handleSelectStorehouse(storehouse)}
                    >
                      <td>{storehouse.id}</td>
                      <td>{storehouse.name}</td>
                      <td>{storehouse.address}</td>
                      <td>{storehouse.max_capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Modal.Body>
          </Modal>

        </div>
      </div>
    </div>

  );
}