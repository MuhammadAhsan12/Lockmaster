import React, { useEffect, useRef, useState } from "react";
import styles from "./MainPopup.module.css";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPassword } from "../../store/actions/userActions";

const MainPopup = ({ close, _id }) => {
  const myRef = useRef();
  const [isPasswordActive, setIsPasswordActive] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const userUpdatePassword = useSelector((state) => state.userUpdatePassword);
  const { loading, success, error } = userUpdatePassword;

  useEffect(() => {
    if (success) {
      setPasswordSuccess(true);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }

  }, [ dispatch, success]);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (form.new_password !== form.confirm_password) {
      setMessage("Passwords do not match");
    } else {
      if (form.new_password.length < 6 && form.new_password.length > 0) {
        setMessage("New password should be equal or more than six characters");
      } else {
        setMessage("");
        dispatch(
          updateUserPassword({
            _id: _id,
            oldPassword: form.old_password,
            password: form.new_password,
          })
        );
      }
    }
  };

  return (
    <div className={styles.main}>
      {!passwordSuccess && (
        <div
          ref={myRef}
          onClick={handleClickInside}
          className={styles.styledDiv}
        >
          <h1 style={{ textTransform: "none" }} className="h1_main pb-2">
            Change Password
          </h1>
          <p className="para_main pb-3">
            Set the new password for your account so you can login and access
            all features.
          </p>
          {message ? (
            <p className="text-center" style={{ color: "red" }}>
              {message}
            </p>
          ) : (
            error && (
              <p className="text-center" style={{ color: "red" }}>
                {error}
              </p>
            )
          )}
          {loading && (
            <div className="text-center">
              <Spinner />
            </div>
          )}
          <div className={styles.body}>
            <form onSubmit={formSubmitHandler}>
              <div className={styles.inputCont}>
                <label>Enter Old Password</label>
                <div className={styles.input}>
                  <input
                    required
                    type={
                      isPasswordActive === "oldpassword" ? "text" : "password"
                    }
                    placeholder="Enter Old Password"
                    name="old_password"
                    value={form.old_password}
                    onChange={handleChange}
                  />
                  {isPasswordActive === "oldpassword" ? (
                    <img
                      onClick={() => setIsPasswordActive("")}
                      src="/images/icons/eyeclose.svg"
                    />
                  ) : (
                    <img
                      onClick={() => setIsPasswordActive("oldpassword")}
                      src="/images/icons/eye.svg"
                    />
                  )}
                </div>
              </div>
              <div className={styles.inputCont}>
                <label>Enter New Password</label>
                <div className={styles.input}>
                  <input
                    required
                    type={
                      isPasswordActive === "newpassword" ? "text" : "password"
                    }
                    placeholder="Enter New Password"
                    name="new_password"
                    value={form.new_password}
                    onChange={handleChange}
                  />
                  {isPasswordActive === "newpassword" ? (
                    <img
                      onClick={() => setIsPasswordActive("")}
                      src="/images/icons/eyeclose.svg"
                    />
                  ) : (
                    <img
                      onClick={() => setIsPasswordActive("newpassword")}
                      src="/images/icons/eye.svg"
                    />
                  )}
                </div>
              </div>
              <div className={styles.inputCont}>
                <label>Confirm Password</label>
                <div className={styles.input}>
                  <input
                    required
                    type={
                      isPasswordActive === "confirmpassword"
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    name="confirm_password"
                    value={form.confirm_password}
                    onChange={handleChange}
                  />
                  {isPasswordActive === "confirmpassword" ? (
                    <img
                      onClick={() => setIsPasswordActive("")}
                      src="/images/icons/eyeclose.svg"
                    />
                  ) : (
                    <img
                      onClick={() => setIsPasswordActive("confirmpassword")}
                      src="/images/icons/eye.svg"
                    />
                  )}
                </div>
              </div>
              <div className={styles.footer}>
                <button type="submit">Update Password</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {passwordSuccess && (
        <div ref={myRef} className={styles.styledDiv}>
          <h1
            onClick={handleClickInside}
            style={{ textTransform: "none" }}
            className="h1_main pb-2"
          >
            Password Changed
          </h1>
          <p onClick={handleClickInside} className="para_main pb-3">
            Your password was successfully changed!
          </p>
          <div
            onClick={handleClickInside}
            className={`${styles.passwordChanged} pb-3`}
          >
            <img src="/images/passwordchanged.svg" />
          </div>
          <div className={styles.footer}>
            <button onClick={() => close(false)} type="button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPopup;
