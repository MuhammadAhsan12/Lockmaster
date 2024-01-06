import styles from "./CustomerDetails.module.css";

const CustomerDetails = ({
  firstName,
  lastName,
  email,
  status,
  phoneNum,
  createdAt,
}) => {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.boxRow}>
          <div>
            <div style={{ display: "flex", flexDirection: "row", gap: "0px" }}>
              <h2 className="h2_main">
                {firstName} {lastName}
              </h2>
              <ul
                style={{
                  fontSize: "12px",
                  marginTop: "3px",
                  marginBottom: "1px",
                }}
              >
                <li style={{ color: "#1FBBC2", marginLeft: "-8px" }}>
                  <span>{status}</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="h3_main">Joined on {createdAt}</h3>
            </div>
          </div>
        </div>

        <div className={styles.detail}>
          <div>
            <h3 className="h3_main">Email address</h3>
            <h2 className="h2_main">{email}</h2>
          </div>
          <div>
            <h3 className="h3_main">Phone Number</h3>
            <h2 className="h2_main">{phoneNum}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
