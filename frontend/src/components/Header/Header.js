import React, { useState } from "react";
import styles from "./Header.module.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ( {getIsActive, IsActive} ) => {
  const [isActive, setIsActive] = useState(false);

  const closeHandler = () => {
    setIsActive(false);
    if(IsActive){
    getIsActive(false)}
  };
  const openHandler = () => {
    setIsActive(false);
    if(IsActive){
      getIsActive(false)
    }
  };
  // add dynamic component conditional rendering

  return (
    <Container style={{ padding: "0px" }} fluid>
      <div className={styles.main}>
        <div className={styles.inner}>
          <div className={styles.menu}>
            {isActive ? (
              <img
                alt=""
                src="/images/menu_close.svg"
                onClick={closeHandler}
              />
            ) : (
              <img
                alt=""
                src="/images/menu.svg"
                onClick={openHandler}
              />
            )}
            <h4 className="h4_main">Menu</h4>
          </div>
          <h2 className="h2_main">Lock Master</h2>
          <div className={styles.pills}>
            <Link to="/dashboard/profile"><img alt="" src="/images/admin.svg" /></Link>
          </div>
        </div>
       
      </div>
    </Container>
  );
};

export default Header;
