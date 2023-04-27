
import '../styles/footer.css';

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebookF,
    faVk,
    faInstagram,
    faTelegram
} from "@fortawesome/free-brands-svg-icons";
import {
    faEnvelope,
    faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";

function Footer() {
    return (
        <footer className="bg-dark-gradient footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-border-bottom pb-6 mb-5">
                        <div className="row">



                            <div className="col-lg-12 col-xl-12 ">
                                <div className="text-lg-end text-white">
                                    <span className="h6 text-start">Телефон</span>
                                    <br />
                                    <a href="tel:1-800-222-000" className="text-decoration-none text-white">
                                        <FontAwesomeIcon icon={faPhoneAlt} /> +375 44 584 65 34
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-lg-3 my-4">
                            
                            <div className="text-white-65 mb-4 text-start">
                                ПРОГРАММНОЕ СРЕДСТВО УЧЕТА И АНАЛИЗА ТОРГОВО-СКЛАДСКИХ ОПЕРАЦИЙ ПРЕДПРИЯТИЯ МАЛОГО БИЗНЕСА
                            </div>
                            <div className="nav footer-socila-icon">

                                <a href="https://t.me/Ksusha_088" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faTelegram} />
                                </a>
                                <a href="https://vk.com/ksusha.zanko" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faVk} />
                                </a>
                                <a href="https://instagram.com/ksushazanko?igshid=ZDdkNTZiNTM=" className="text-decoration-none text-white">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </a>


                            </div>
                        </div>

                        <div className="col-sm-6 col-lg-3 my-4 text-end">
                            <h5 className="text-white h6 mb-4">Политика</h5>
                            <ul className="list-unstyled white-link footer-links">
                                <li>
                                    <a href="#">Конфиденциальность</a>
                                </li>
                                <li>
                                    <a href="#">Правила использования</a>
                                </li>

                            </ul>
                        </div>

                        <div className="col-sm-6 col-lg-3 my-4 text-end">
                            <h5 className="text-white h6 mb-4">О компании</h5>
                            <ul className="list-unstyled white-link footer-links ">
                                <li>
                                    <a href="#">О нас</a>
                                </li>
                                <li>
                                    <a href="#">Наша команда</a>
                                </li>

                            </ul>
                        </div>

                        <div className="col-sm-10 col-lg-3 my-4 text-end">
                            <h5 className="text-white h6 mb-4">Связь с нами</h5>
                            <ul className="list-unstyled white-link footer-links">
                                <li>
                                    <a href="#">
                                        <FontAwesomeIcon icon={faEnvelope} /> zankoksusha@gmail.com
                                    </a>
                                </li>

                                <li>
                                    <a href="#">ул. Чичурина 24, Минск, РБ, 220055</a>
                                </li>
                                <li>
                                    <a href="/contacts">Контакты</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 text-md-start text-center mb-md-0 mb-3">
                            <span className="text-white-50">All rights reserved © 2023 </span>
                        </div>
                        <div className="col-md-6 text-md-end text-center">
                            <span className="text-white-50">Designed by <a href="#" className="text-decoration-none text-white-50">Kseniya Zanko</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;