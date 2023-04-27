import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Menu from "./Menu";
import '../styles/style.css';
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faFileCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Documents() {
  const [documents, setDocuments] = useState([]);


  const { id } = useParams();



  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    const result = await axios.get("http://localhost:8081/documents");
    setDocuments(result.data);
  };

  const deleteDocument = async (id) => {
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

  return (
    <div>
      <Menu />




      <div className="table-wrapper-scroll-y my-custom-scrollbar">
        <div className="py-4 d-flex justify-content-end">
          <table className="table border shadow "  >
            <thead>
              <tr>

                <th scope="col">Номер</th>
                <th scope="col">Дата</th>
                <th scope="col">Статус</th>
                <th scope="col">Тип</th>
                <th scope="col">Пользователь</th>
                <th scope="col">Контрагент</th>
                <th scope="col">Коэффициент</th>
                <th scope="col">Количество товаров</th>
                <th scope="col">Общая сумма</th>

                <th scope="col">
                  
                  <Link
                    className="btn btn-dark ml-0 "
                    to={`/adddocument`}
                    style={{ float: "right" }}
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

                  <td>{document.status}</td>
                  <td>{document.type}</td>
                  <td>{document.user.name}</td>
                  <td>{document.supplier.name}</td>
                  <td>{document.coefficient}</td>
                  <td>{document.amount}</td>
                  <td>{document.summ}</td>
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

                    <button
                      className="btn btn-dark mx-2"
                      onClick={() => holdDocument(document)}
                    >

                      Изменить статус
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