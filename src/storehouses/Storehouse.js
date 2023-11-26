import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../menu/MainMenu";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import '../styles/style.css';

export default function Storehouse() {
    const [storehouses, setStorehouses] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams();


    const [storehouse, setStorehouse] = useState({
        name: "",
        address: "",
        max_capacity: ""
    });

    const { name, address, max_capacity } = storehouse

    const onInputChange = async (e) => {

        setStorehouse({ ...storehouse, [e.target.name]: e.target.value });

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name || !address || !max_capacity) {
            setError('Заполните все поля!');
            return;
        }

        if (isNaN(parseFloat(max_capacity))) {
            setError('Максимальная вместительность должна быть числом');
            return;
        }

        await axios.post("http://localhost:8081/storehouse", storehouse);
        loadStorehouses();


    };

    useEffect(() => {
        loadStorehouses();
    }, []);

    const loadStorehouses = async () => {
        const result = await axios.get("http://localhost:8081/storehouses");
        setStorehouses(result.data);
    };

    const deleteStorehouse = async (id) => {
        await axios.delete(`http://localhost:8081/storehouse/${id}`);
        loadStorehouses();
    };

    return (
        <div className="items-container">
            <Menu />
            <div className="category-container">
            <label className="name-lable" >
                    СПРАВОЧНИК СКЛАДОВ
                </label>
            
                <div className="row" >

                    <div className="col-md-7">
                        <div className="py-4 d-flex justify-content-end">
                            <table className="table border shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">ИД</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Адрес</th>
                                        <th scope="col">Максимальная вместительность</th>
                                        <th scope="col">

                                            Действие
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {storehouses.map((storehouse, index) => (
                                        <tr>
                                            <th scope="row" key={index}>
                                                {index + 1}
                                            </th>
                                            <td>{storehouse.name}</td>
                                            <td>{storehouse.address}</td>
                                            <td>{storehouse.max_capacity}</td>

                                            <td>
                                                <Link className="btn btn-outline-dark mx-2" to={`/editstorehouse/${storehouse.id}`}>
                                                    <FontAwesomeIcon icon={faPen} />
                                                </Link>
                                                <button className="btn btn-dark mx-2" onClick={() => deleteStorehouse(storehouse.id)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="col-md-4">
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">
                                    Название склада
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Введите название"
                                    name="name"
                                    value={name}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">
                                    Адрес
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Введите адрес"
                                    name="address"
                                    value={address}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Name" className="form-label">
                                    Максимальная вместительность
                                </label>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Введите максимальную вместительность"
                                    name="max_capacity"
                                    value={max_capacity}
                                    onChange={(e) => onInputChange(e)}
                                />
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}
                            <button type='submit' className='btn add-category-btn'>
                                Добавить
                            </button>
                        </form>
                    </div>






                </div>
            </div>
        </div>
    );
}