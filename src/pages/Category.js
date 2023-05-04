import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../menu/MainMenu";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import '../styles/style.css';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const { id } = useParams();


    const [category, setCategory] = useState({
        name: "",
        description: ""
    });

    const { name, description } = category

    const onInputChange = async (e) => {

        setCategory({ ...category, [e.target.name]: e.target.value });

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description) {
            setError('Заполните все поля!');
            return;
        }
        await axios.post("http://localhost:8081/category", category);
        loadCategories();


    };

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const result = await axios.get("http://localhost:8081/categories");
        setCategories(result.data);
    };

    const deleteCategory = async (id) => {
        await axios.delete(`http://localhost:8081/category/${id}`);
        loadCategories();
    };

    return (
        <div className="items-container">
            <Menu />
            <div className="category-container">

                <div className="row">

                    <div className="col-md-7">
                        <div className="py-4 d-flex justify-content-end">
                            <table className="table border shadow">
                                <thead>
                                    <tr>
                                        <th scope="col">ИД</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Описание</th>
                                        <th scope="col">

                                            Действие
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.map((category, index) => (
                                        <tr>
                                            <th scope="row" key={index}>
                                                {index + 1}
                                            </th>
                                            <td>{category.name}</td>
                                            <td>{category.description}</td>

                                            <td>
                                                <Link className="btn btn-outline-dark mx-2" to={`/editcategory/${category.id}`}>
                                                    <FontAwesomeIcon icon={faUserPen} />
                                                </Link>
                                                <button className="btn btn-dark mx-2" onClick={() => deleteCategory(category.id)}>
                                                    <FontAwesomeIcon icon={faUserMinus} />
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
                                    Название категории
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
                                <label htmlFor="Email" className="form-label">
                                    Описание
                                </label>
                                <textarea
                                    type={"text"}
                                    className="form-control-descrip"
                                    placeholder="Введите описание"
                                    name="description"
                                    value={description}
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