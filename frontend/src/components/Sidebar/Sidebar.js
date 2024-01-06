import React from "react";
import styles from "./Sidebar.module.css";
import { Data } from "./Data";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions/userActions";

const Sidebar = ({ barActive }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const logoutHandler = () => {
    window.location.reload();
    dispatch(logout());
  };

  return (
    <div className={styles.main}>
      <div className={styles.inner}>
        <div className={styles.profile}>
          <img alt="" src="/images/admin.svg" />
          <div>
            <h6 className="h6_main">Welcome Back!</h6>
            <h2 className="h2_main">Abdul</h2>
          </div>
        </div>
        <div className={styles.tabs}>
          {Data.map((item) => (
            <Link
              key={item.text}
              style={{ textDecoration: "none", width: "100%" }}
              to={item.link}
            >
              <div
                key={item.text}
                className={`${styles.tab} ${
                  location.pathname === item.link && !item.subItems
                    ? styles.tabActive
                    : location.pathname.slice(0, 29) ===
                        "/dashboard/servicesmanagement" &&
                      item.subItems &&
                      styles.tabActive
                }`}
              >
                {location.pathname === item.link ? (
                  <img alt="" src={item.iconActive} />
                ) : location.pathname.slice(0, 29) ===
                    "/dashboard/servicesmanagement" && item.subItems ? (
                  <img alt="" src={item.iconActive} />
                ) : (
                  <img alt="" src={item.icon} />
                )}
                <h3 className="h3_main">{item.text}</h3>
              </div>
              {item.subItems &&
              location.pathname === "/dashboard/servicesmanagement/main" ? (
                <div className={styles.subItem}>
                  {item.subItems.map((item) => (
                    <Link key={item.text} to={item.link}>
                      <div className={styles.bulletPoint} />{" "}
                      <h3
                        style={{
                          color: location.pathname === item.link && "#3ec5b8",
                        }}
                        className="h3_main"
                      >
                        {item.text}
                      </h3>
                    </Link>
                  ))}
                </div>
              ) : (
                item.subItems &&
                location.pathname ===
                  "/dashboard/servicesmanagement/homescreen" && (
                  <div className={styles.subItem}>
                    {item.subItems.map((item) => (
                      <Link to={item.link}>
                        <div className={styles.bulletPoint} />{" "}
                        <h3
                          style={{
                            color: location.pathname === item.link && "#3ec5b8",
                          }}
                          className="h3_main"
                        >
                          {item.text}
                        </h3>
                      </Link>
                    ))}
                  </div>
                )
              )}
            </Link>
          ))}
        </div>
        <div onClick={logoutHandler} className={styles.logout}>
          <img alt="" src="/images/icons/logoutIcon.svg" />
          <h3 style={{ color: "#FF0000" }} className="h3_main">
            Sign out
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
