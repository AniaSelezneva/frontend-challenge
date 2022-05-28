import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";

function Header() {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.inactive_link
            }
            to="/"
          >
            Все котики
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active_link : styles.inactive_link
            }
            to="/fav"
          >
            Любимые котики
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
