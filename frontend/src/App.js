import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword";
import "./App.css";
import SignIn from "./components/SignInPage";
import NewPasswordField from "./components/NewPasswordField";
import CustomerScreen from "./screens/DashboardScreens/CustomerScreen/CustomerScreen";
import ProfileScreen from "./screens/DashboardScreens/ProfileScreen/ProfileScreen";
import CustomerScreenView from "./screens/DashboardScreens/CustomerScreenView/CustomerScreenView";
import { useSelector } from "react-redux";
import CustomerEditScreen from "./screens/DashboardScreens/CustomerEditScreen/CustomerEditScreen";
import CustomerAddScreen from "./screens/DashboardScreens/CustomerAddScreen/CustomerAddScreen";
import PhoneAddScreen from "./screens/DashboardScreens/PhoneAddScreen/PhoneAddScreen";
import PhoneListScreen from "./screens/DashboardScreens/PhoneListScreen/PhoneListScreen";
import PhoneEditScreen from "./screens/DashboardScreens/PhoneEditScreen/PhoneEditScreen";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recoveryState =
    localStorage.getItem("userRecoveryState") === "userRecoveryState"
      ? true
      : false;

  return (
    // Routing Section Start
    <Router>
      {!userInfo && (
        <Routes>
          <Route path="/*" element={<Navigate to="/" />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/account-recovery" element={<ForgetPassword />} />
        </Routes>
      )}
      {userInfo && recoveryState && (
        <Routes>
          <Route path="/*" element={<Navigate to="/newpasswordfield" />} />
          <Route path="/newpasswordfield" element={<NewPasswordField />} />
        </Routes>
      )}
      {userInfo && !recoveryState && (
        <Routes>
          <Route path="/*" element={<Navigate to="/dashboard" />} />
          <Route
            path="/dashboard"
            element={<Navigate to="/dashboard/customer" />}
          />
          <Route path="/dashboard/profile" element={<ProfileScreen />} />
          <Route path="/dashboard/customer" element={<CustomerScreen />} />
          <Route
            path="/dashboard/customer/:id"
            element={<CustomerScreenView />}
          />
          <Route
            path="/dashboard/customer/:id/edit"
            element={<CustomerEditScreen />}
          />
          <Route
            path="/dashboard/customer/:id/phone/add"
            element={<PhoneAddScreen />}
          />
          <Route
            path="/dashboard/customer/add"
            element={<CustomerAddScreen />}
          />
          <Route path="/dashboard/phone" element={<PhoneListScreen />} />
          <Route path="/dashboard/phone/:id/edit" element={<PhoneEditScreen />} />
        </Routes>
      )}
    </Router>
    // Routing section End
  );
}

export default App;
