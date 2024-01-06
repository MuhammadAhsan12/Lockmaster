import React, { useEffect, useState } from "react";
import Header from "../../../components/Header/Header";
import Sidebar from "../../../components/Sidebar/Sidebar";
import styles from "./ProfileScreen.module.css";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import MainPopup from "../../../components/Popup/MainPopup";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserProfile,
} from "../../../store/actions/userActions";

const ProfileScreen = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [profileUpdated, setProfileUpdated]=useState()
 
  const [change, setChange] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { _id, firstName, lastName, email, phoneNum, error, loading } =
    userDetails;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    loading: updateLoading,
    success,
    error: updateProfileError,
  } = userUpdateProfile;

 
  const resetHandler = () => {
    setForm({
      ...form,
      first_name: firstName,
      last_name: lastName,
      email: email,
    });
    setChange(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setChange(true);
  };

  useEffect(() => {
    if (!firstName || success) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch(getUserDetails("profile"));
    } else {
      setForm({
        first_name: firstName,
        last_name: lastName,
        email: email,
      });
}
  }, [firstName, lastName, email, phoneNum, dispatch, success]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        _id: _id,
        firstName: form.first_name,
        lastName: form.last_name,
        email: form.email,
      })
    );
    setProfileUpdated(true)
    setChange(false);
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
            <h1 className="h1_main pb-5">Account</h1>
            <div style={{ width: "100%" }} className="text-center pb-4">
              {error && (
                <p className="para_main" style={{ color: "red" }}>
                  {error}
                </p>
              )}
              {updateProfileError && (
                <p className="para_main" style={{ color: "red" }}>
                  {"User Already Exists"}
                </p>
              )}
              {!updateLoading && profileUpdated && (
                <p style={{ color: "green" }}>Profile Updated Successfully!</p>
              )}
              {loading && <Spinner />}
              {updateLoading && <Spinner />}
            </div>
            <Row className="gy-5">
              <Col lg={3}>
                <div
                  style={{ backgroundImage: "url(/images/admin.svg)" }}
                  className={styles.profileImg}
                >
                  <div className={styles.camera}>
                    <img alt="" src="/images/icons/camera.svg" />
                  </div>
                </div>
              </Col>
              <Col lg={9}>
                <div className={styles.form}>
                  <Form onSubmit={formSubmitHandler}>
                    <div className={`${styles.row} mb-4`}>
                      <Form.Group
                        className={styles.formGroup}
                        controlId="firstName"
                      >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Your First Name"
                          name="first_name"
                          value={form.first_name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group
                        className={styles.formGroup}
                        controlId="lastName"
                      >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter Your Last Name"
                          name="last_name"
                          value={form.last_name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </div>
                    <Form.Group
                      className={`${styles.formGroup} mb-4`}
                      controlId="email"
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        placeholder="Enter Your Email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <div className={`${styles.row} mb-4`}>
                      <Form.Group
                        className={styles.formGroup}
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          placeholder="x-x-x-x-x-x-x"
                          name="password"
                          disabled
                        />
                      </Form.Group>
                      <button
                        type="button"
                        onClick={() => setIsPopupOpen(true)}
                        className={styles.change}
                      >
                        Change
                      </button>
                    </div>
                    {change && (
                      <div className={styles.buttonRow}>
                        <button
                          type="reset"
                          onClick={resetHandler}
                          className={`${styles.cancel} button_main`}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className={`${styles.saveChanges} button_main`}
                        >
                          Save Changes
                        </button>
                      </div>
                    )}
                  </Form>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      {isPopupOpen && (
        <MainPopup
        _id={_id}
          close={(e) => setIsPopupOpen(e)}
        />
      )}
    </>
  );
};

export default ProfileScreen;
