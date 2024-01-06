import React, { useEffect, useRef, useState } from "react";
import styles from "./CalendarPopup.module.css";
import Calendar from "react-calendar";
import "./CalendarPopup.css";

const CalendarPopup = ({ close, marginTop, marginRight }) => {
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

  // Calendar changing logic would be added according to tabs changing later through API's

  return (
    <div className={styles.main}>
      <div
        style={{
          marginTop: marginTop && marginTop,
          marginRight: marginRight && marginRight,
        }}
        ref={myRef}
        onClick={handleClickInside}
        className={styles.inner}
      >
        <div className={`${styles.body} calendarCont`}>
          <Calendar maxDetail="month" />
          <div className={styles.tabCont}>
            <div className={`${styles.tab} ${styles.tabActive}`}>
              <h3 className="h3_main">Today</h3>
            </div>
            <div className={styles.tab}>
              <h3 className="h3_main">This Week</h3>
            </div>
            <div className={styles.tab}>
              <h3 className="h3_main">This Month</h3>
            </div>
            <div className={styles.tab}>
              <h3 className="h3_main">Last 6 Months</h3>
            </div>
            <div className={styles.tab}>
              <h3 className="h3_main">Last Year</h3>
            </div>
            <div className={styles.tab}>
              <h3 className="h3_main">Customer Range</h3>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <button className={`${styles.cancel} button_main`}>Cancel</button>
          <button className={`${styles.apply} button_main`}>Apply</button>
        </div>
      </div>
    </div>
  );
};

export default CalendarPopup;
