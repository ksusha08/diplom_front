import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "../menu/MainMenu";
import '../styles/style.css';
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Documents() {
  const [documentInfo, setDocumentInfo] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const userRole = JSON.parse(localStorage.getItem("user")).roles;

  const { id } = useParams();

  const [sortField, setSortField] = useState('number');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortDocuments = (field) => {
    const order = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
    setDocuments(prevDocs => [...prevDocs].sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];
      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    }));
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const result = await axios.get("http://localhost:8081/documents");
    setDocuments(result.data);
  };

  const deleteDocument = async (id) => {

    const result = await axios.get(`http://localhost:8081/documentInfo/findByDocId/${id}`);
    const documentInfoList = result.data;

    // Проходим по всем записям в DocumentInfo и удаляем каждую по ее id
    await Promise.all(documentInfoList.map(async (documentInfo) => {
      await axios.delete(`http://localhost:8081/documentInfo/${documentInfo.id}`);
    }));

    await axios.delete(`http://localhost:8081/document/${id}`);
    loadDocuments();
  };

  const holdDocument = async (selectedDocument) => {
    if (selectedDocument.status === "проведен") {

      if (selectedDocument.type === "приход") {
        await axios.delete(`http://localhost:8081/income/${selectedDocument.id}/`);
      } else {
        await axios.delete(`http://localhost:8081/expense/${selectedDocument.id}/`);
      }

    } else {

      if (selectedDocument.type === "приход") {
        await axios.post(`http://localhost:8081/income/${selectedDocument.id}/`);
      } else {
        await axios.post(`http://localhost:8081/expense/${selectedDocument.id}/`);
      }
    }
    loadDocuments();
  };

  const searchDocuments = async () => {
    const result = await axios.get(`http://localhost:8081/search_document/${searchTerm}`);
    setDocuments(result.data);
  };

  const filterDocuments = async () => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    const result = await axios.get(`http://localhost:8081/filter_document/${start}/${end}`);
    setDocuments(result.data);
  };

  return (
    <div className="items-container">
      <Menu />

      <div className="search">

        <input
          type="text"
          placeholder="Номер документа"
          className="form-control"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-dark mx-2"
          onClick={searchDocuments}
        >
          Поиск
        </button>

        <div className="search2">
        <input
          type="date"
          placeholder="Дата начала"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Дата окончания"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button className="btn btn-dark mx-2" onClick={filterDocuments}>
          Фильтровать
        </button>
      </div>
      </div>

      

      <div className="doc-container">
        <div className="table-wrapper-scroll-y my-custom-scrollbar">
          <div className="py-4 d-flex justify-content-end">

            <table className="table border shadow "  >
              <thead>
                <tr>

                  <th scope="col" onClick={() => sortDocuments('number')}>
                    Номер
                    {sortField === 'number' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'number' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('date')}>
                    Дата
                    {sortField === 'date' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'date' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('storehouse')}>
                    Время доставки
                    {sortField === 'delivery' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'delivery' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('storehouse')}>
                    Склад
                    {sortField === 'storehouse' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'storehouse' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>

                  <th scope="col" onClick={() => sortDocuments('status')}>
                    Статус
                    {sortField === 'status' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'status' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('type')}>
                    Тип
                    {sortField === 'type' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'type' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('user.name')}>
                    Пользователь
                    {sortField === 'user.name' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'user.name' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('supplier.name')}>
                    Контрагент
                    {sortField === 'supplier.name' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'supplier.name' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('coefficient')}>
                    Коэффициент
                    {sortField === 'coefficient' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'coefficient' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('amount')}>
                    Количество товаров
                    {sortField === 'amount' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'amount' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>
                  <th scope="col" onClick={() => sortDocuments('summ')}>
                    Общая сумма
                    {sortField === 'summ' && sortOrder === 'asc' && <FontAwesomeIcon icon={faArrowUp} />}
                    {sortField === 'summ' && sortOrder === 'desc' && <FontAwesomeIcon icon={faArrowDown} />}
                  </th>

                  <th scope="col">

                    <button
                      className="btn btn-dark ml-1 "
                      onClick={() => loadDocuments()}
                      style={{ float: "right" }}
                    >
                      <FontAwesomeIcon icon={faRedo} />
                    </button>

                    <Link
                      className="btn btn-dark ml-1 "
                      to={`/adddocument`}
                      style={{ float: "right", marginRight: "10px" }}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </Link>
                    Действие
                  </th>

                </tr>
              </thead>
              <tbody>
                {documents.map((document, index) => (
                  <tr>

                    <td>{document.number}</td>
                    <td>{new Date(document.date).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                    <td>{document.delivery}</td>
                    <td>{document.storehouse.name}</td>
                    <td>{document.status}</td>
                    <td>{document.type}</td>
                    <td>{document.user.name}</td>
                    <td>{document.supplier.name}</td>
                    <td>{document.coefficient}</td>
                    <td>{document.amount}</td>
                    <td>{(document.summ).toFixed(1)}</td>
                    <td>


                      <Link
                        className={`btn btn-outline-dark mx-0
                         ${document.status === "проведен" ? "disabled" : ""}`}
                        to={document.status === "проведен" ? "#" : `/editdocument/${document.id}`}
                      >
                        <FontAwesomeIcon icon={faFilePen} />
                      </Link>

                      <button
                        className="btn btn-outline-dark mx-2"
                        onClick={() => deleteDocument(document.id)}
                        disabled={document.status === "проведен"}
                      >
                        <FontAwesomeIcon icon={faFileCircleMinus} />
                      </button>

                      <Link
                        className="btn btn-dark mx-0"
                        to={`/opendocument/${document.id}`}
                      >
                        <FontAwesomeIcon icon={faFolderOpen} />
                      </Link>


                      {userRole.includes('USER') && (
                        <button
                          className="btn btn-dark mx-2"
                          onClick={() => holdDocument(document)}
                        >

                          Изменить статус
                        </button>
                      )}

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