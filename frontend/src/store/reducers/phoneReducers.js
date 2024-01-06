export const myPhonesListReducer = (state = { phones: [] }, action) => {
  switch (action.type) {
    case "MY_PHONE_LIST_REQUEST":
      return {
        loading: true,
      };

    case "MY_PHONE_LIST_SUCCESS":
      return {
        loading: false,
        success: true,
        phones: action.payload,
      };

    case "MY_PHONE_LIST_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "MY_PHONE_LIST_RESET":
      return { phones: [] };
    default:
      return state;
  }
};

export const phoneCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PHONE_CREATE_REQUEST":
      return {
        loading: true,
      };

    case "PHONE_CREATE_SUCCESS":
      return {
        loading: false,
        success: true,
        phone: action.payload,
      };

    case "PHONE_CREATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };
    case "PHONE_CREATE_RESET":
      return {};

    default:
      return state;
  }
};


export const phoneUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case "PHONE_UPDATE_REQUEST":
      return {
        loading: true,
      };

    case "PHONE_UPDATE_SUCCESS":
      return {
        loading: false,
        success: true,
      };

    case "PHONE_UPDATE_FAIL":
      return {
        loading: false,
        error: action.payload,
      };

    case "PHONE_UPDATE_RESET":
      return {};

    default:
      return state;
  }
};

// Admin

export const phoneListReducer = (state = { phones: [] }, action) => {
  switch (action.type) {
    case "PHONE_LIST_REQUEST":
      return { loading: true };

    case "PHONE_LIST_SUCCESS":
      return {
        loading: false,
        phones: action.payload,
      };

    case "PHONE_LIST_FAIL":
      return { loading: false, error: action.payload };

    case "PHONE_LIST_RESET":
      return { phones: [] };

    default:
      return state;
  }
};

export const phoneByIdReducer = (phone = {}, action) => {
  switch (action.type) {
    case "PHONE_ID_REQUEST":
      return { loading: true };

    case "PHONE_ID_SUCCESS":
      return {
        loading: false,
        _id: action.payload._id,
        name: action.payload.name,
        deviceId: action.payload.deviceId,
        paid: action.payload.paid,
        status: action.payload.status,
        createdAt: action.payload.createdAt,
        isAdmin: action.payload.isAdmin,
      };

    case "PHONE_ID_FAIL":
      return { loading: false, error: action.payload };

    case "PHONE_ID_RESET":
      return { phone: {} };

    default:
      return phone;
  }
};
