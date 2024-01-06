import React, { Fragment, useEffect, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserById, updateUser } from "../../../store/actions/userActions";
import styles from "./CustomerEditScreen.module.css";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";

const CustomerEditScreen = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();
  const history = useNavigate();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [Status, setStatus] = useState("");

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdate;

  const userById = useSelector((state) => state.userById);
  const { _id, firstName, lastName, email, status, error, loading } = userById;

  useEffect(() => {
    dispatch({ type: "USER_UPDATE_RESET" });
    if (successUpdate) {
      history("/dashboard/customer");
    } else {
      if (!firstName || _id !== id) {
        dispatch(getUserById(id));
      } else {
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setStatus(status);
      }
    }
  }, [dispatch, history, firstName, id, successUpdate]);

  const formSubmitHander = (event) => {
    event.preventDefault();

    dispatch(
      updateUser({
        _id: id,
        firstName: FirstName,
        lastName: LastName,
        email: Email,
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
            <h1 className="h1_main pb-5">Edit User</h1>
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
                  <div className={`${styles.row} mb-4`}>
                    <Form.Group className={styles.formGroup} controlId="name">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        required
                        type="name"
                        placeholder="Enter First Name"
                        value={FirstName}
                        onChange={(event) => setFirstName(event.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group className={styles.formGroup} controlId="name">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type="name"
                        placeholder="Enter Last Name"
                        value={LastName}
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
                        value={Email}
                        onChange={(event) => setEmail(event.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group
                      controlId="colour2"
                    >
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
                        checked={Status === "disabled"}
                        label="Disabled"
                        onChange={(e) =>
                          e.target.checked && setStatus("disabled")
                        }
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

export default CustomerEditScreen;
