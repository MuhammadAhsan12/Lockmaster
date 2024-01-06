import React, { useEffect } from "react";
import styles from "./ServiceProvidersTable.module.css";
import { Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePhone } from "../../store/actions/phoneActions";

const ServiceProvidersTable = ({ Data }) => {
  const dispatch = useDispatch();

  const phoneUpdate = useSelector((state) => state.phoneUpdate);
  const { error, loading, success } = phoneUpdate;

  useEffect(() => {
    if (success) {
      dispatch({ type: "PHONE_UPDATE_RESET" });
      window.location.reload();
    }
  }, [success]);

  return (
    <>
      <div className="text-center" style={{ width: "100%" }}>
        {error && (
          <p className="para_main text-center" style={{ color: "red" }}>
            {error}
          </p>
        )}
        {loading && <Spinner />}
      </div>
      {!error && !loading && (
        <Table className={styles.table} striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Device ID</th>
              <th>Device Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item) => (
              <tr key={item._id}>
                <td className={styles.checkBox}>
                  <input type="checkbox" />
                </td>
                <td className={styles.id}>{item.deviceId}</td>
                <td className={styles.amount}>{item.name}</td>
                <td
                  style={{ color: item.status === "pending" ? "red" : "blue" }}
                  className={styles.status}
                >
                  {item.status}
                </td>
                <td className={styles.action}>
                  <select
                    onChange={(e) =>
                      dispatch(
                        updatePhone({
                          _id: item._id,
                          status: e.target.value,
                        })
                      )
                    }
                    className={styles.customSelect}
                  >
                    <option
                      selected={item.status === "pending" && "selected"}
                      value="pending"
                    >
                      Pending
                    </option>
                    <option
                      selected={item.status === "active" && "selected"}
                      value="active"
                    >
                      Active
                    </option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ServiceProvidersTable;
