import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import styles from "./DynamicTable.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUserStatus } from "../../store/actions/userActions";
import { updatePhone } from "../../store/actions/phoneActions";

const DynamicTable = ({ phones, Data }) => {
  const dispatch = useDispatch();
  const [datePassedList, setDatePassedList] = useState([]);

  const userStatusUpdate = useSelector((state) => state.userStatusUpdate);
  const { error } = userStatusUpdate;

  function hasPassed30Days(date) {
    const oldDate = new Date(date).getTime();
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - oldDate;
    const daysDifference = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    return daysDifference >= 4;
  }

  useEffect(() => {
    if (Data) {
      const results = Data.map((item) => hasPassed30Days(item.createdAt));
      setDatePassedList(results);
    }
  }, [Data]);

  return (
    <>
      <div style={{ width: "100%" }}>
        {error && (
          <p className="para_main text-center" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
      {!error && (
        <Table className={styles.table} striped>
          <thead>
            <tr>
              <th>#</th>
              {phones && <th>Device ID</th>}
              <th>Customer Name</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th>Edit</th>
              {!phones && <th>View</th>}
            </tr>
          </thead>
          <tbody>
            {Data.map((item, index) => (
              <tr>
                <td
                  style={
                    datePassedList[index] && item.paid === "notpaid"
                      ? { backgroundColor: "red", color: "white" }
                      : {}
                  }
                  className={styles.checkBox}
                >
                  <input type="checkbox" />
                </td>
                {phones && (
                  <td
                    style={
                      datePassedList[index] && item.paid === "notpaid"
                        ? { backgroundColor: "red", color: "white" }
                        : {}
                    }
                    className={styles.customerName}
                  >
                    {item.deviceId}
                  </td>
                )}
                {phones && (
                  <td
                    style={
                      datePassedList[index] && item.paid === "notpaid"
                        ? { backgroundColor: "red", color: "white" }
                        : {}
                    }
                    className={styles.customerName}
                  >{`${`${item.user.firstName} ${item.user.lastName}`}`}</td>
                )}
                {!phones && (
                  <td
                    style={
                      datePassedList[index] && item.paid === "notpaid"
                        ? { backgroundColor: "red", color: "white" }
                        : {}
                    }
                    className={styles.customerName}
                  >{`${`${item.firstName} ${item.lastName}`}`}</td>
                )}
                <td
                  style={
                    datePassedList[index] && item.paid === "notpaid"
                      ? { backgroundColor: "red", color: "white" }
                      : {}
                  }
                  className={styles.phoneNum}
                >{`${`${phones ? item.user.phoneNum : item.phoneNum}`}`}</td>
                <td
                  style={
                    datePassedList[index] && item.paid === "notpaid"
                      ? { backgroundColor: "red", color: "white" }
                      : {}
                  }
                  className={styles.status}
                >
                  <select
                    style={
                      datePassedList[index] && item.paid === "notpaid"
                        ? { color: "white" }
                        : {}
                    }
                    onChange={(e) =>
                      phones
                        ? dispatch(
                            updatePhone({
                              _id: item._id,
                              status: e.target.value,
                            })
                          )
                        : dispatch(
                            updateUserStatus({
                              _id: item._id,
                              status: e.target.value,
                            })
                          )
                    }
                    className={styles.customSelect}
                  >
                    <option
                      selected={item.status === "active" && "selected"}
                      value="active"
                    >
                      Active
                    </option>
                    <option
                      selected={item.status === "pending" && "selected"}
                      value="pending"
                    >
                      Pending
                    </option>
                    <option
                      selected={item.status === "inactive" && "selected"}
                      value="inactive"
                    >
                      Inactive
                    </option>
                  </select>
                </td>
                <td
                  style={
                    datePassedList[index] && item.paid === "notpaid"
                      ? { backgroundColor: "red", color: "white" }
                      : {}
                  }
                  className={styles.view}
                >
                  <Link
                    to={`${`/dashboard/${phones ? "phone" : "customer"}/`}${
                      item._id
                    }${"/edit"}`}
                  >
                    <svg
                      style={{
                      
                        fill:
                          datePassedList[index] &&
                          item.paid === "notpaid" &&
                          "white",
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                    </svg>
                  </Link>
                </td>

                {!phones && (
                  <td
                    style={
                      datePassedList[index] && item.paid === "notpaid"
                        ? { backgroundColor: "red", color: "white" }
                        : {}
                    }
                    className={styles.view}
                  >
                    <Link to={`${"/dashboard/customer/"}${item._id}`}>
                      <img src="/images/icons/eyeblue.svg" />
                    </Link>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default DynamicTable;
