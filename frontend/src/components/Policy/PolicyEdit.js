import React, { useEffect, useState } from "react";
import { Col, Row, Form, Spinner } from "react-bootstrap";
import styles from "./Policy.module.css";
import { listDocDetails, updateDoc } from "../../store/actions/docActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PolicyEdit = ({ condition }) => {
  const [form, setForm] = useState({
    title: "",
    text: "",
  });

  const dispatch = useDispatch();
  const history = useNavigate();

  const docDetails = useSelector((state) => state.docDetails);
  const { loading, error, doc } = docDetails;

  const docUpdate = useSelector((state) => state.docUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = docUpdate;


  useEffect(() => {
    dispatch({ type: "DOC_UPDATE_RESET" });
    if (successUpdate) {
      history(`/dashboard/${condition}`);
      window.location.reload();
    } else {
      if (!doc) {
        dispatch(listDocDetails(condition));
      } else {
        setForm({ title: doc.title, text: doc.text });
      }
    }
  }, [dispatch, history, condition, doc, successUpdate]);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDoc({ condition: condition, title: form.title, text: form.text })
    );
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      {loading || loadingUpdate ? (
        <Spinner />
      ) : error || errorUpdate ? (
        <p className="para_main" style={{ color: "red" }}>
          {error ? error : errorUpdate}
        </p>
      ) : (
        <Form onSubmit={formSubmitHandler}>
          <Row className="gy-5" style={{ marginBottom: "20px" }}>
            <Col lg={12}>
              <div className={styles.button}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <div className={styles.form}>
                <div className={`mb-4`}>
                  <Form.Group
                    className={styles.formGroup}
                    // controlId="title"
                  >
                    <Form.Label className={styles.formTitle}>Title</Form.Label>
                    <Form.Control
                      className={styles.formTitleText}
                      required
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>

                <div className={`mb-4`}>
                  <Form.Group
                    className={styles.formGroup}
                    // controlId="text"
                  >
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className={styles.formTitleText}
                      required
                      name="text"
                      value={form.text}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
};

export default PolicyEdit;
