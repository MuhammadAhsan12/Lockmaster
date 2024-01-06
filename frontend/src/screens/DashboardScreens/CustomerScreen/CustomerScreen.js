import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./CustomerScreen.module.css";
import Pagination from "../../../components/UI Helpers/Pagination/Pagination";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import { listUsers } from "../../../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerScreen = () => {
  const [isActive, setIsActive] = useState(true);
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: "USER_LIST_RESET" });
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <Header getIsActive={(e) => setIsActive(e)} />
      <div
        style={{
          width: "100%",
          height: "92vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar barActive={isActive} />
        <div className={styles.main}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="para_main" style={{ color: "red" }}>
              {error}
            </p>
          ) : (
            <>
              <div className={styles.head}>
                <h1 className="h2_main text-start">Customers</h1>
                <Link to="/dashboard/customer/add">
                  <img src="/images/icons/addIcon.svg" />
                </Link>
              </div>
              <div className={styles.body}>
                <DynamicTable Data={users} />
              </div>
              <Pagination />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerScreen;
