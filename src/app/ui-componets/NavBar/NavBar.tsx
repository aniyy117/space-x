import React, { useState } from "react";
import styles from "./NavBar.module.scss";
import { Logo } from "../../assets/icons/logo/Logo";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id="NavBar" className={styles.container}>
        <NavLink className={styles.nav_logo} to="/">
          <Logo fill={"black"} width={"201"} height={"50"} />
        </NavLink>
        <div className={styles.nav_item}>
          <NavLink to="/" className={styles.active}>
            History
          </NavLink>
          <NavLink to="/payload" className={styles.active}>
            Payload
          </NavLink>
        </div>
      </div>
      {/* small screen */}
      <div id="NavBar" className={styles.container_small}>
        <NavLink className={styles.nav_logo} to="/">
          <Logo fill={"white"} width={"150"} height={"65"} />
        </NavLink>
        <div className={styles.smallScreenNav}>
          <IconButton onClick={() => setOpen(true)}>
            <MenuIcon sx={{ color: "white", fontSize: "2.5rem" }} />
          </IconButton>
          <Drawer open={open} anchor={"right"} onClose={() => setOpen(false)}>
            <div
              className={styles.nav_item_small}
              style={{
                width: 250,
                height: "100%",
                display: " flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <NavLink
                to="/"
                className={styles.active}
                onClick={() => setOpen(false)}
              >
                History
              </NavLink>
              <NavLink
                to="/payload"
                className={styles.active}
                onClick={() => setOpen(false)}
              >
                Payload
              </NavLink>
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

// ----------------------------------------------------------------------------------

export default NavBar;
