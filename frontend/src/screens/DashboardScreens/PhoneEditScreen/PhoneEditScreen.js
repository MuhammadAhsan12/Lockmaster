import React, { useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Header from "../../../components/Header/Header";
import styles from "./PhoneEditScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPhoneById, updatePhone } from "../../../store/actions/phoneActions";

const PhoneEditScreen = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const history = useNavigate();

  const [Name, setName] = useState("");
  const [DeviceId, setDeviceId] = useState("");
  const [Status, setStatus] = useState("");
  const [Paid, setPaid] = useState("");

  const phoneUpdate = useSelector((state) => state.phoneUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = phoneUpdate;

  const phoneById = useSelector((state) => state.phoneById);
  const { _id, name, deviceId, createdAt, paid, status, error, loading } =
    phoneById;

  useEffect(() => {
    dispatch({ type: "PHONE_UPDATE_RESET" });
    if (successUpdate) {
      history("/dashboard/phone");
      window.location.reload();
    } else {
      if (!_id) {
        dispatch(getPhoneById(id));
      } else {
        setName(name);
        setDeviceId(deviceId);
        setStatus(status);
        setPaid(paid);
      }
    }
  }, [dispatch, history, _id, id, successUpdate]);

  const formSubmitHander = (event) => {
    event.preventDefault();

    dispatch(
      updatePhone({
        _id: id,
        name: Name,
        deviceId: DeviceId,
        paid: Paid,
        status: Status,
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
            <h1 className="h1_main pb-5">Edit Phone</h1>
            {loadingUpdate && <Spinner />}
            {errorUpdate && (
              <p className="para_main" style={{ color: "red" }}>
                {errorUpdate}
              </p>
            )}
            {loading ? (
              <Spinner />
            ) : error ? (
              <p className="para_main" style={{ color: "red" }}>
                {error}
              </p>
            ) : (
              <div className={styles.form}>
                <Form onSubmit={formSubmitHander}>
                  <h3 className="h3_main pb-4">
                    Date Created{" "}
                    <span style={{ fontWeight: "900" }}>{createdAt}</span>
                  </h3>
                  <div className={`${styles.row} mb-4`}>
                    <Form.Group className={styles.formGroup} controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        required
                        type="name"
                        placeholder="Enter Name"
                        value={Name}
                        onChange={(event) => setName(event.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="name">
                      <Form.Label>Device ID</Form.Label>
                      <Form.Control
                        required
                        type="name"
                        placeholder="Enter Device ID"
                        value={DeviceId}
                        onChange={(event) => setDeviceId(event.target.value)}
                      ></Form.Control>
                    </Form.Group>
                  </div>
                  <div className={`${styles.row} mb-4`}>
                    <Form.Group controlId="colour2">
                      <Form.Label>Status</Form.Label>
                      <Form.Check
                        checked={Status === "active"}
                        label="Active"
                        onChange={(e) =>
                          e.target.checked && setStatus("active")
                        }
                      />
                      <Form.Check
                        checked={Status === "pending"}
                        label="Pending"
                        onChange={(e) =>
                          e.target.checked && setStatus("pending")
                        }
                      />
                      <Form.Check
                        checked={Status === "inactive"}
                        label="Inactive"
                        onChange={(e) =>
                          e.target.checked && setStatus("inactive")
                        }
                      />
                    </Form.Group>
                    <Form.Group controlId="colour2">
                      <Form.Label>Is First Installment Paid?</Form.Label>
                      <Form.Check
                        checked={Paid === "paid"}
                        label="Paid"
                        onChange={(e) => e.target.checked && setPaid("paid")}
                      />
                      <Form.Check
                        checked={Paid === "notpaid"}
                        label="Not Paid"
                        onChange={(e) => e.target.checked && setPaid("notpaid")}
                      />
                    </Form.Group>
                  </div>
                  <br></br>
                  <Button type="submit" variant="primary">
                    Update
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

export default PhoneEditScreen;
