import axios from "axios";

export const getPhoneList = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "MY_PHONE_LIST_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/phones/${id}/myphones`, config);

      dispatch({
        type: "MY_PHONE_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "MY_PHONE_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const createPhone = (phone) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "PHONE_CREATE_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/phones`, phone, config);

      dispatch({
        type: "PHONE_CREATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHONE_CREATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updatePhone = (phone) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "PHONE_UPDATE_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/phones/${phone._id}/status`,
        phone,
        config
      );

      dispatch({
        type: "PHONE_UPDATE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHONE_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};


// Admin

export const listPhones = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "PHONE_LIST_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/phones`, config);

      dispatch({
        type: "PHONE_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHONE_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getPhoneById = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "PHONE_ID_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/phones/${id}`, config);

      dispatch({
        type: "PHONE_ID_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "PHONE_ID_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};