import React, { useState, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { recoveryLogin } from "../store/actions/userActions";
import { Spinner } from "react-bootstrap";
import NewPasswordField from "./NewPasswordField";

// Styled component for the container of the Verification page
const VerificationContainer = styled("div")({
  height: "100vh",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f0f0",
  background:
    "var(--main-color, linear-gradient(90deg, #1FBBC2 0%, #67D1AB 100%))",
});

// Styled component for the name heading
const NameTypography = styled(Typography)(({ theme }) => ({
  color: "#FFF",
  textAlign: "center",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "44px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  marginBottom: theme.spacing(12),
}));

// Styled component for the title of the form
const TitleTypography = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "28px",
  fontWeight: 400,
  lineHeight: "normal",
  marginBottom: theme.spacing(2),
}));

// Styled component for the form message
const MessageTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: "#484848",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: "0.15px",
  width: "355px",
}));

// Styled component for the counter text
const CounterTypography = styled(Grid)(({ theme }) => ({
  textAlign: "center",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "16px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "24px",
  letterSpacing: "0.15px",
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  marginBottom: theme.spacing(3),
}));

// Styled component for the rounded button
const RoundedButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flex: 1,
  width: "362px",
  padding: "15px 0px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "5px",
  background:
    "var(--main-color, linear-gradient(90deg, #1FBBC2 0%, #67D1AB 100%))",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "14px",
  fontWeight: 510,
  lineHeight: "normal",
  marginBottom: theme.spacing(3),
}));

// Styled component for the "Resend" link
const ResendLink = styled(Link)(({ theme }) => ({
  color: "#828282",
  textAlign: "center",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "20px",
  letterSpacing: "0.25px",
}));

const Verification = ({ email, open }) => {
  const [isRed, setIsRed] = useState(false);
  const [counter, setCounter] = useState(120);
  const [OTP, setOTP] = useState("");
  const dispatch = useDispatch();

  const userRecoveryLogin = useSelector((state) => state.userRecoveryLogin);
  const { error, success, loading } = userRecoveryLogin;

  function handleChange(OTP) {
    setIsRed(false);
    setOTP(OTP);
  }

  useEffect(() => {
    if (success) {
      window.location.reload();
      setIsRed(false);
    } else {
      if (error) {
        setIsRed(true);
      }
    }
  }, [success, error, dispatch]);

  const formSubmitHander = (e) => {
    e.preventDefault();
    dispatch(recoveryLogin({ email, rec_code: OTP }));
  };

  useEffect(() => {
    if (counter > 0 && !isRed) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000); // Decrease counter every 1 second
      return () => clearTimeout(timer);
    }
  }, [counter, isRed]);

  return (
    <>
        <VerificationContainer>
          {/* Grid container for alignment */}
          <Grid spacing={2} direction="column">
            {/* Name heading */}
            <Grid item>
              <NameTypography variant="h4">Kadom</NameTypography>
            </Grid>
            {/* Main form container */}
            <Grid item>
              <form
                style={{
                  borderRadius: 10,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  padding: "30px",
                  backgroundColor: "white",
                }}
                onSubmit={formSubmitHander}
              >
                {/* Grid container for form elements */}
                <Grid spacing={2} direction="column">
                  {/* Title */}
                  <Grid item>
                    <TitleTypography variant="h6" color="primary">
                      Verification
                    </TitleTypography>
                  </Grid>
                  {/* Message */}
                  <Grid item>
                    <MessageTypography variant="h6" color="primary">
                      Enter your 4 digits code that you received on your email.
                    </MessageTypography>
                  </Grid>

                  {loading && (
                    <div className="text-center pb-2" style={{ width: "100%" }}>
                      <Spinner />
                    </div>
                  )}
                  {/* Code input fields */}
                  <OtpInput
                    value={OTP}
                    onChange={handleChange}
                    numInputs={4}
                    inputStyle={{
                      display: "flex",
                      width: "65px",
                      height: "56px",
                      margin: "15px 9px",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "36px",
                      fontFamily: "Open Sans",
                      fontWeight: "400",
                      borderRadius: "5px",
                      outline: "#f6f6f6",
                      border:
                        isRed || counter === 0
                          ? "2px solid #F2451C"
                          : "1px solid #9BADCA",
                    }}
                    renderInput={(props) => <input {...props} />}
                  />
                  <Grid item>
                    <CounterTypography
                      variant="h6"
                      color="primary"
                      style={
                        isRed || counter === 0
                          ? { backgroundColor: "#F2451C" }
                          : { backgroundColor: "#1FBBC2", color: "#FFFFFF" }
                      }
                    >
                      {isRed || counter === 0
                        ? error && error
                        : `00:${counter < 10 ? `0${counter}` : counter}`}
                    </CounterTypography>
                  </Grid>
                  <Grid item>
                    <RoundedButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      CONTINUE
                    </RoundedButton>
                  </Grid>
                  {/* "Resend" link */}
                  <Grid
                    item
                    style={{ textAlign: "center", alignItems: "center" }}
                  >
                    <ResendLink onClick={() => open(false)}>
                      Didn’t receive a code? Resend!
                    </ResendLink>
                  </Grid>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </VerificationContainer>

    </>
  );
};

export default Verification;
