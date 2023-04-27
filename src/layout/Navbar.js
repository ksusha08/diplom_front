import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>

      <nav className="bg-dark-gradient footer navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/main">
            TOBAPHO-СКЛАДСКОЙ УЧЕТ
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link
            className="btn btn-outline-dark mx-2"
            to={`/`}
          >
            Выйти
          </Link>

        </div>
      </nav>
    </div>
  )
}
