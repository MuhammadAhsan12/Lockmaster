import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./DashboardSummary.module.css";

const DashboardSummary = ({ data }) => {
  // props will be used when data is provided through API's

  return (
    <Container>
      <Row className="gx-5 gy-5 d-flex justify-content-center align-items-center">
        <Col style={{maxWidth:"220px", maxHeight:"160px"}} className="d-flex justify-content-center align-items-center" lg={4} sm={6}>
          <div className={`${styles.box} ${styles.boxActive}`}>
            <h1 className="h1_main">300</h1>
            <p className="para_main">Service Providers</p>
          </div>
        </Col>
        <Col style={{maxWidth:"220px", maxHeight:"160px"}} className="d-flex justify-content-center align-items-center" lg={4} sm={6}>
          <div className={styles.box}>
            <h1 className="h1_main">350</h1>
            <p className="para_main">Customers</p>
          </div>
        </Col>
        <Col style={{maxWidth:"220px", maxHeight:"160px"}} className="d-flex justify-content-center align-items-center" lg={4} sm={6}>
          <div className={styles.box}>
            <h1 className="h1_main">930</h1>
            <p className="para_main">Total Jobs Completed</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardSummary;
