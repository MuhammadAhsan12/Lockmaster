import React, { useEffect, useRef } from "react";
import styles from "./FiltersPopup.module.css";

const FiltersPopup = ({ close }) => {
  const myRef = useRef();

  const handleClickOutside = (e) => {
    if (!myRef.current.contains(e.target)) {
      close(false);
    }
  };
  const handleClickInside = () => close(true);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return (
    <div className={styles.main}>
      <div ref={myRef} onClick={handleClickInside} className={styles.inner}>
        <div className={styles.body}>
          <h4 className="h4_main">Filters</h4>
          <div className={styles.filter}>
            <input type="checkbox" />
            <h3 className="h3_main">All</h3>
          </div>
          <div className={styles.filter}>
            <input type="checkbox" />
            <h3 className="h3_main">Pending</h3>
          </div>
          <div className={styles.filter}>
            <input type="checkbox" />
            <h3 className="h3_main">Verified</h3>
          </div>
          <div className={styles.filter}>
            <input type="checkbox" />
            <h3 className="h3_main">Unverified</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersPopup;
