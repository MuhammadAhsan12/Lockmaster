import React, { useEffect } from "react";
import { Spinner, Table } from "react-bootstrap";
import styles from "./ServicesTable.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteServiceCategory } from "../../store/actions/serviceCategoryActions";

const ServicesTable = ({ Data, image, loading }) => {
  const dispatch = useDispatch();

  const serviceCategoryDelete = useSelector(
    (state) => state.serviceCategoryDelete
  );
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = serviceCategoryDelete;

  useEffect(() => {
    dispatch({ type: "SERVICE_CATEGORY_DELETE_RESET" });
    if (successDelete) {
      window.location.reload();
    }
  }, [successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure You Want To Delete This Document?")) {
      dispatch(deleteServiceCategory(id));
    }
  };
  return (
    <>
      <div className=" text-center" style={{ width: "100%" }}>
        {errorDelete && (
          <p className="para_main" style={{ color: "red" }}>
            {errorDelete}
          </p>
        )}
        {loadingDelete || loading && <Spinner />}
      </div>
     {!loading && <>
        <Table className={styles.table} striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Admin Services</th>
              {image && <th>Image</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item) => (
              <tr>
                <td className={styles.checkBox}>
                  <input type="checkbox" />
                </td>
                <td
                  style={{ width: !image && "74%" }}
                  className={styles.services}
                >
                  {item.title}
                </td>
                {image && (
                  <td className={styles.image}>
                    <img src="/images/admin.svg" />
                  </td>
                )}
                <td className={styles.action}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/dashboard/servicesmanagement/${item._id}`}
                  >
                    <div className={styles.edit}>
                      <img src="/images/icons/editIcon.svg" />
                      <h3 className="h3_main">Edit</h3>
                    </div>
                  </Link>
                  <div
                    onClick={() => deleteHandler(item._id)}
                    className={styles.add}
                  >
                    <img src="/images/icons/deleteIcon.svg" />
                    <h3 className="h3_main">Remove</h3>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>}
    </>
  );
};

export default ServicesTable;
