import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Spinner } from "react-bootstrap";
import DynamicTable from "../../../components/DynamicTable/DynamicTable";
import styles from "./PhoneListScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { listPhones } from "../../../store/actions/phoneActions";
import Pagination from "../../../components/UI Helpers/Pagination/Pagination";

const PhoneListScreen = () => {
  const dispatch = useDispatch();
  const [condition, setCondition] = useState("");

  const phoneList = useSelector((state) => state.phoneList);
  const { loading, error, phones: Phones } = phoneList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const phones =
    condition === ""
      ? Phones
      : Phones.filter((item) => item.status === condition);

  useEffect(() => {
    dispatch({ type: "USER_LIST_RESET" });
    if (userInfo && userInfo.isAdmin) {
      dispatch(listPhones());
    }
  }, [dispatch, userInfo]);


  return (
    <>
      <Header />
      <div
        style={{
          width: "100%",
          height: "92vh",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Sidebar />
        <div className={styles.main}>
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="para_main" style={{ color: "red" }}>
              {error}
            </p>
          ) : (
            <>
              <h1 className="h2_main">Phones</h1>
              <div className={styles.head}>
              <h1 className="h3_main">Filters</h1>
              <div className={`${styles.tab} mt-3`}>
                <h3
                  onClick={() => setCondition("")}
                  className={`h3_main ${
                    condition === "" && styles.tabActive
                  }`}
                >
                  All Phones
                </h3>
                <h3
                  onClick={() => setCondition("active")}
                  className={`h3_main ${
                    condition === "active" && styles.tabActive
                  }`}
                >
                  Active
                </h3>
                <h3
                  onClick={() => setCondition("pending")}
                  className={`h3_main ${
                    condition === "pending" && styles.tabActive
                  }`}
                >
                  Pending
                </h3>
                <h3
                  onClick={() => setCondition("inactive")}
                  className={`h3_main ${
                    condition === "inactive" && styles.tabActive
                  }`}
                >
                  Inactive
                </h3>
              </div>
              </div>
              <div className={styles.body}>
                <DynamicTable phones={true} Data={phones} />
              </div>
              <Pagination />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PhoneListScreen;
