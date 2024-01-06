import React, { useEffect } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { Container, Spinner } from "react-bootstrap";
import CustomerDetails from "../../../components/CustomerDetails/CustomerDetails";
import styles from "./CustomerScreenView.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../store/actions/userActions";
import { getPhoneList } from "../../../store/actions/phoneActions";
import ServiceProvidersTable from "../../../components/ServiceProvidersTable/ServiceProvidersTable";
import { Data } from "./Data";

const CustomerScreenView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const myPhoneList = useSelector((state) => state.myPhoneList);
  const { phones, error: errorPhones, loading: loadingPhones } = myPhoneList;
  const userById = useSelector((state) => state.userById);
  const {
    _id,
    firstName,
    lastName,
    email,
    phoneNum,
    status,
    createdAt,
    error,
    loading,
  } = userById;

  useEffect(() => {
    dispatch(getUserById(id));
    dispatch(getPhoneList(id));
  }, [id, dispatch]);

  console.log(phones, "error", errorPhones);

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
            <Container className={styles.maindiv}>
              <div className={`${styles.iconBack} pb-4`}>
                <Link to="/dashboard/customer">
                  <img
                    src="/images/icons/arrowleft.svg"
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#000000",
                    }}
                    alt=""
                  />
                </Link>
                <h3 className="h3_main">Customer</h3>
              </div>
              <CustomerDetails
                firstName={firstName}
                lastName={lastName}
                email={email}
                phoneNum={phoneNum}
                status={status}
                createdAt={createdAt}
              />
              {loadingPhones ? (
                <Spinner />
              ) : errorPhones ? (
                <p className="para_main" style={{ color: "red" }}>
                  {errorPhones}
                </p>
              ) : (
                <>
                  <div className={styles.head}>
                    <h1 className="h2_main text-start">Add Phone</h1>
                    <Link to={`/dashboard/customer/${id}/phone/add`}>
                      <img src="/images/icons/addIcon.svg" />
                    </Link>
                  </div>
                  <ServiceProvidersTable Data={phones} _id={_id} />
                </>
              )}
            </Container>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomerScreenView;
