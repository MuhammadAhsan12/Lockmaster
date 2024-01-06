import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPhone } from "../../../store/actions/phoneActions";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import styles from "./PhoneAddScreen.module.css";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

const PhoneAddScreen = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const history = useNavigate();

  const [name, setName] = useState("");
  const [deviceId, setDeviceId] = useState("");

  const phoneCreate = useSelector((state) => state.phoneCreate);
  const { success, error, loading } = phoneCreate;

  useEffect(() => {
    dispatch({ type: "PHONE_CREATE_RESET" });
    if (success) {
      history(`/dashboard/customer/${id}`);
      window.location.reload();
    }
  }, [dispatch, history, name, id, success]);

  const formSubmitHander = (event) => {
    event.preventDefault();
    dispatch(
      createPhone({
        userId: id,
        name,
        deviceId,
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
            <h1 className="h1_main pb-5">Add Phone</h1>
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
                      <Form.Label>Phone Name</Form.Label>
                      <Form.Control
                        required
                        type="name"
                        placeholder="Enter Device Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="name">
                      <Form.Label>Device ID</Form.Label>
                      <Form.Control
                        required
                        type="id"
                        placeholder="Enter Device ID"
                        value={deviceId}
                        onChange={(event) => setDeviceId(event.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                  <br></br>
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Create Phone
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

export default PhoneAddScreen;
