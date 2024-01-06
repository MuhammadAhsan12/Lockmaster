import axios from "axios";
// import emailjs from "@emailjs/browser";

export const login = (userLogin) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_LOGIN_REQUEST",
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/users/login", userLogin, config);

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_LOGIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const recoveryLogin = (userLogin) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_RECOVERY_LOGIN_REQUEST",
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/users/login/recovery",
        userLogin,
        config
      );

      dispatch({
        type: "USER_RECOVERY_LOGIN_SUCCESS",
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("userRecoveryState", "userRecoveryState");
    } catch (error) {
      dispatch({
        type: "USER_RECOVERY_LOGIN_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getAccountRecoveryCode = (email) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_CODE_REQUEST",
      });

      const { data } = await axios.post("/api/users/accountrecovery", email);

      dispatch({
        type: "USER_CODE_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_CODE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "USER_REGISTER_REQUEST",
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/users", user, config);

      dispatch({
        type: "USER_REGISTER_SUCCESS",
        payload: data,
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER_LOGOUT" });
    dispatch({ type: "USER_DETAILS_RESET" });
  };
};

export const getUserDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_DETAILS_REQUEST",
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
      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({
        type: "USER_DETAILS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_DETAILS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_UPDATE_PROFILE_REQUEST",
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
      const { data } = await axios.put(`/api/users/profile`, user, config);

      dispatch({
        type: "USER_UPDATE_PROFILE_SUCCESS",
        payload: data,
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_PROFILE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserPassword = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_UPDATE_PASSWORD_REQUEST",
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
      const { data } = await axios.put(`/api/users/password`, user, config);

      dispatch({
        type: "USER_UPDATE_PASSWORD_SUCCESS",
        payload: data,
      });

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: data,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_PASSWORD_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

// Admin actions

export const listUsers = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_LIST_REQUEST",
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/users`, config);

      dispatch({
        type: "USER_LIST_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_ID_REQUEST",
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
      const { data } = await axios.get(`/api/users/${id}`, config);

      dispatch({
        type: "USER_ID_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_ID_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUserStatus = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_STATUS_REQUEST",
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.put(`/api/users/status`, user, config);

      dispatch({
        type: "USER_STATUS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_STATUS_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};

export const updateUser = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: "USER_UPDATE_REQUEST",
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
      const { data } = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({
        type: "USER_UPDATE_SUCCESS",
      });

      dispatch({
        type: "USER_DETAILS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
};
