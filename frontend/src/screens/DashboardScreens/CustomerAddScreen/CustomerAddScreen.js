import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../../store/actions/userActions";
import styles from "./CustomerAddScreen.module.css";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";

const CustomerAddScreen = () => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { success, error, loading } = userRegister;

  useEffect(() => {
    dispatch({ type: "USER_CREATE_RESET" });
    if (success) {
      history("/dashboard/customer");
      window.location.reload();
    }
  }, [dispatch, history, success]);

  const formSubmitHander = (event) => {
    event.preventDefault();
    dispatch(
      register({
        firstName,
        lastName,
        email,
        phoneNum,
      })
    );
  };

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
        <Container>
          <div className={styles.main}>
            <h1 className="h1_main pb-5">Add User</h1>
            {loading ? (
              <Spinner />
            ) : error ? (
              <p className="para_main" style={{ color: "red" }}>
                {error}
              </p>
            ) : (
              <div className={styles.form}>
                <Form onSubmit={formSubmitHander}>
                <div className={`${styles.row} mb-4`}>
                  <Form.Group className={styles.formGroup} controlId="name">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className={styles.formGroup} controlId="name">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      required
                      type="name"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  </div>
                  <div className={`${styles.row} mb-4`}>
                  <Form.Group className={styles.formGroup} controlId="name">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className={styles.formGroup} controlId="name">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      required
                      type="telephone"
                      placeholder="Enter Phone Number"
                      value={phoneNum}
                      onChange={(event) => setPhoneNum(event.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
                  <br></br>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Create User
                  </Button>
                </Form>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default CustomerAddScreen;
