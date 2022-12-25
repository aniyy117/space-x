import React from "react";
import styles from "./NavBar.module.scss";
import { Logo } from "../../assets/icons/logo/Logo";
import { NavLink } from "react-router-dom";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div id="NavBar" className={styles.container}>
      <NavLink className={styles.nav_logo} to="/">
        <Logo fill={"black"} width={"201"} height={"50"} />
      </NavLink>
      <div className={styles.nav_item}>
        <NavLink to="/" className={styles.active}>
          Home
        </NavLink>
        <NavLink to="/payload" className={styles.active}>
          Payload
        </NavLink>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default NavBar;
