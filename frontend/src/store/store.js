import thunk from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userAccountRecoveryCodeReducer,
  userByIdReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userUpdatePasswordReducer,
  userRecoveryLoginReducer,
  userUpdateProfileReducer,
  userStatusUpdateReducer,
  userUpdateReducer,
  userRegisterReducer,
} from "./reducers/userReducers";
import {
  myPhonesListReducer,
  phoneByIdReducer,
  phoneCreateReducer,
  phoneListReducer,
  phoneUpdateReducer,
} from "./reducers/phoneReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userAccountRecoveryCode: userAccountRecoveryCodeReducer,
  userRecoveryLogin: userRecoveryLoginReducer,
  userStatusUpdate: userStatusUpdateReducer,
  userDetails: userDetailsReducer,
  userById: userByIdReducer,
  userList: userListReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdatePassword: userUpdatePasswordReducer,
  userUpdate: userUpdateReducer,
  phoneList: phoneListReducer,
  phoneById: phoneByIdReducer,
  myPhoneList: myPhonesListReducer,
  phoneUpdate: phoneUpdateReducer,
  phoneCreate: phoneCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
