import React from "react";
import { NavLink } from "react-router-dom";

import Styles from "./Navigation.module.scss";
import logo from "../../Img/logo Edu Banegas.jpg";

export default function Navigation() {
  return (
    <div className={Styles.containerNavigation}>
      <NavLink to="/" className={Styles.containerLogo}>
        <img src={logo} alt="Logo letra E" />
      </NavLink>

      <div className={Styles.containerButtonsNav}>
        <ul>
          <li>
            <NavLink className={({ isActive }) => (isActive ? Styles.buttonActive : Styles.buttonInactived)} to="/">
              Inicio
            </NavLink>
          </li>

          <li>
            <NavLink className={({ isActive }) => (isActive ? Styles.buttonActive : Styles.buttonInactived)} to="/statistics">
              Estadisticas
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
