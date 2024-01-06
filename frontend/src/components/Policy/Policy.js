import { Row, Col, Spinner } from "react-bootstrap";
import styles from "./Policy.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  createDoc,
  deleteDoc,
  listDocDetails,
} from "../../store/actions/docActions";

const TermsScreen = ({ condition }) => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const docDetails = useSelector((state) => state.docDetails);
  const { loading, error, doc } = docDetails;

  const docDelete = useSelector((state) => state.docDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = docDelete;

  const docCreate = useSelector((state) => state.docCreate);
  const {
    doc: createdDoc,
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
  } = docCreate;


  useEffect(() => {
    dispatch({ type: "DOC_CREATE_RESET" });
    if (successCreate) {
      history(`/dashboard/${condition}/${createdDoc._id}/edit`);
    } 
      dispatch(listDocDetails(condition));
 
  }, [dispatch, history, condition, location, successDelete, successCreate, createdDoc]);

 

  const deleteHandler = () => {
    if (window.confirm("Are You Sure You Want To Delete This Document?")) {
      dispatch(deleteDoc(condition));
    }
  };

  const createDocHandler = () => {
    dispatch(createDoc(condition));
  };

  return (
    <>
      <Row className="gy-5" style={{ marginBottom: "20px" }}>
        <Col lg={5}>
          <h1 className="h1_main" style={{ textTransform: "none" }}>
            {doc && doc.title ? doc.title : "Create Page"}
          </h1>
        </Col>
        <Col lg={7}>
          <div className={styles.contentCol}>
            {!doc && (
              <div className={styles.contentMaterial}>
                <img
                  onClick={createDocHandler}
                  src="/images/icons/addIcon.svg"
                />
                <h5 className="h2_main">Add</h5>
              </div>
            )}
            {doc && (
              <Link style={{textDecoration:"none"}} to={`/dashboard/${condition}/${doc._id}/edit`}>
                <div className={styles.contentMaterial}>
                  <img src="/images/icons/editIcon.svg" />
                  <h5 className="h2_main">Edit</h5>
                </div>
              </Link>
            )}
            {doc && (
              <div className={styles.contentMaterial}>
                <img
                  onClick={deleteHandler}
                  src="/images/icons/deleteIcon.svg"
                />
                <h5 className="h2_main">Delete</h5>
              </div>
            )}
            <h2 className="h3_main">{doc && doc.editedAt.slice(0, 10)}</h2>
          </div>
        </Col>
      </Row>

      <Row className="gy-5">
        {loadingDelete || loadingCreate || loading && (
          <div className={styles.textDiv}>
            <Spinner />
          </div>
        )}
        {errorDelete ||
          errorCreate ||
          (error && (
            <p className="para_main" style={{ color: "red" }}>
              {errorDelete ? errorDelete : error ? error : errorCreate}
            </p>
          ))}
        {doc && doc.text && (
          <div className={styles.textDiv}>
            <p className={`para_main ${styles.showText}`}>{doc.text}</p>
          </div>
        )}
      </Row>
    </>
  );
};

export default TermsScreen;