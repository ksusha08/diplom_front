
import '../styles/contacts.css';
import React, { useEffect } from "react";
import { YMaps, Map ,  Placemark } from '@pbe/react-yandex-maps';

export default function Contacts() {
  return (
    <div className="d-flex">
      <section className="h-lg-100 py-0">
        <div className="container h-lg-100">
          <div className="row h-lg-100 ">
            <div className="text-start col-lg-6 h-lg-100 pb-lg-5">
              <h1>Контакты</h1>
              <div className="text-contact">
                <h5 className="text-h5">
                  УЧЕТ И АНАЛИЗ ТОРГОВО-СКЛАДСКИХ ОПЕРАЦИЙ
                </h5>
                <h5>
                  <span className="contacts-text ">Адрес: </span>
                  улица Чичурина 24, Минск, Республика Беларусь, 220055
                </h5>
                <h5>
                  <span className="contacts-text">Почта: </span>
                  zankoksusha@gmail.com
                </h5>
                <h5>
                  <span className="contacts-text">Телефон: </span>
                  +375-44-584-65-34
                </h5>
              </div>
            </div>
            
              <div className="map-container">
              <YMaps query={{ apikey: 'ef2fe61d-e530-4b11-9598-7775080580ba' }}>
                  <Map
                  className="map"
                    defaultState={{
                      center: [53.917994, 27.464166],
                      zoom: 16,
                    }}
                  >
                    <Placemark geometry={[53.917994, 27.464166]} />
                  </Map>
                </YMaps>
              </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}