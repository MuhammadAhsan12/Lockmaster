import React from "react";
import styles from "./Pagination.module.css";

const Pagination = () => {
     // Pagination functionality to be added according to the APIs 
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <img src="/images/icons/chevronLeft.svg" />
        <div className={styles.list}>
          <div className={`${styles.number} ${styles.numberActive}`}>
            <h3 className="h3_main">1</h3>
          </div>
          <div className={styles.number}>
            <h3 className="h3_main">2</h3>
          </div>
          <div className={styles.number}>
            <h3 className="h3_main">3</h3>
          </div>
          <div className={styles.number}>
            <h3 className="h3_main">4</h3>
          </div>
          <div className={styles.number}>
            <h3 className="h3_main">5</h3>
          </div>
          <div className={styles.number}>
            <h3 className="h3_main">6</h3>
          </div>
          <div className={styles.number}>
            <h3 className="h3_main">7</h3>
          </div>
        </div>
        <img src="/images/icons/chevronRight.svg" />
      </div>
    </div>
  );
};

export default Pagination;
