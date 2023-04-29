import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Modal, Table } from "react-bootstrap";
import '../styles/style.css';

export default function AddItem() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  let navigate = useNavigate();

  const [item, setItem] = useState({
    name: '',
    vendoreCode: '',
    discountPrice: '',
    number: '',
  });

  const { name, vendoreCode, discountPrice, number } = item;

  const onInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios.get("http://localhost:8081/categories");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategoryId(selectedCategory.id);
    setShowModal(false);
  };



  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photos', e.target.photos.files[0]);
    formData.append('item', new Blob([JSON.stringify(item)], {
      type: 'application/json'
    }));

    const categoryId = selectedCategoryId;

    await axios.post(`http://localhost:8081/item/${categoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    navigate('/items');
  };



  return (
   
    <div className=" main-container">
        <div className='row'>
          <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
            <h2 className='text-center m-4'>Добавить товар</h2>

            <form onSubmit={(e) => onSubmit(e)} enctype="multipart/form-data">
              <div className='mb-3'>
                <label htmlFor='Name' className='form-label'>
                  Наименование
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Введите наименование'
                  name='name'
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="id_category" className="form-label">
                  Категория
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Выберите категорию"
                    value={
                      selectedCategoryId
                        ? categories.find((s) => s.id === selectedCategoryId)
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

              <div className='mb-3'>
                <label htmlFor='VendoreCode' className='form-label'>
                  Артикул
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Введите артикул'
                  name='vendoreCode'
                  value={vendoreCode}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              

              <div className='mb-3'>
                <label htmlFor='Price' className='form-label'>
                  Цена
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Введите цену'
                  name='discountPrice'
                  value={discountPrice}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='Number' className='form-label'>
                  Количество
                </label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Введите количество'
                  name='number'
                  value={number}
                  onChange={(e) => onInputChange(e)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="photos" className="form-label">
                  Изображение товара
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="photos"
                  name="photos"
                  accept=".jpg,.png,.jpeg"
                />
              </div>

              <div className='d-flex justify-content-between align-items-center'>
                <Link to='/items' className='btn btn-danger'>
                  Назад
                </Link>
                <button type='submit' className='btn btn-primary'>
                  Добавить
                </button>
              </div>
            </form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Выберите категорию</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>

                      <th>Название</th>
                      <th>Описание</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr
                        key={category.id}
                        onClick={() => handleSelectCategory(category)}
                      >

                        <td>{category.name}</td>
                        <td>{category.description}</td>
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