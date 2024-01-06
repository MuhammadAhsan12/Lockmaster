export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };

    case "USER_LOGIN_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};

export const userAccountRecoveryCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_CODE_REQUEST":
      return { loading: true };

    case "USER_CODE_SUCCESS":
      return { loading: false, success: true };

    case "USER_CODE_FAIL":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userRecoveryLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_RECOVERY_LOGIN_REQUEST":
      return { loading: true };

    case "USER_RECOVERY_LOGIN_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };

    case "USER_RECOVERY_LOGIN_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LOGOUT":
      return {};

    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };

    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };

    case "USER_REGISTER_FAIL":
      return { loading: false, error: action.payload };

    case "USER_CREATE_RESET":
      return {};

    default:
      return state;
  }
};

export const userDetailsReducer = (user = {}, action) => {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { loading: true };

    case "USER_DETAILS_SUCCESS":
      return {
        loading: false,
        _id: action.payload._id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phoneNum: action.payload.phoneNum,
        isAdmin: action.payload.isAdmin,
      };

    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };

    case "USER_DETAILS_RESET":
      return { user: {} };

    default:
      return user;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PROFILE_REQUEST":
      return { loading: true };

    case "USER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };

    case "USER_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload };

    case "USER_UPDATE_PROFILE_RESET":
      return {};

    default:
      return state;
  }
};
export const userUpdatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_PASSWORD_REQUEST":
      return { loading: true };

    case "USER_UPDATE_PASSWORD_SUCCESS":
      return { loading: false, success: true, userInfo: action.payload };

    case "USER_UPDATE_PASSWORD_FAIL":
      return { loading: false, error: action.payload };

    case "USER_UPDATE_PASSWORD_RESET":
      return {};

    default:
      return state;
  }
};

// Admin reducers

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "USER_LIST_REQUEST":
      return { loading: true };

    case "USER_LIST_SUCCESS":
      return {
        loading: false,
        users: action.payload,
      };

    case "USER_LIST_FAIL":
      return { loading: false, error: action.payload };

    case "USER_LIST_RESET":
      return { users: [] };

    default:
      return state;
  }
};

export const userByIdReducer = (user = {}, action) => {
  switch (action.type) {
    case "USER_ID_REQUEST":
      return { loading: true };

    case "USER_ID_SUCCESS":
      return {
        loading: false,
        _id: action.payload._id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        phoneNum: action.payload.phoneNum,
        status: action.payload.status,
        createdAt: action.payload.createdAt,
        isAdmin: action.payload.isAdmin,
      };

    case "USER_ID_FAIL":
      return { loading: false, error: action.payload };

    case "USER_ID_RESET":
      return { user: {} };

    default:
      return user;
  }
};

export const userStatusUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_STATUS_REQUEST":
      return {
        loading: true,
      };

    case "USER_STATUS_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "USER_STATUS_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "USER_STATUS_RESET":
      return {};

    default:
      return state;
  }
};

export const userUpdateReducer = (user = {}, action) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return { loading: true };

    case "USER_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "USER_UPDATE_FAIL":
      return { loading: false, error: action.payload };

    case "USER_UPDATE_RESET":
      return {};

    default:
      return user;
  }
};
