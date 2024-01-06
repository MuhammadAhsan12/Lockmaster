import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { login } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

// Styled component for the container of the sign-in page
const SignInContainer = styled("div")({
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

// Styled component for the main form container
const form = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(7),
  borderRadius: 10,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

// Styled component for the title of the form
const TitleTypography = styled(Typography)(({ theme }) => ({
  color: "var(--primary, #25282B)",
  textAlign: "center",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "28px",
  fontStyle: "normal",
  fontWeight: 700,
  lineHeight: "normal",
  marginBottom: theme.spacing(4),
}));

// Styled component for the form labels
const FormLabelTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  color: "var(--primary, #25282B)",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 590,
  lineHeight: "normal",
}));

// Styled component for the form input fields
const FormField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: "362px",
  height: "49px",
  flexShrink: 0,
}));

// Styled component for the rounded button
const RoundedButton = styled(Button)(({ theme }) => ({
  display: "flex",
  flex: 1,
  width: "362px",
  padding: "15px 0px",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "35px",
  background:
    "var(--main-color, linear-gradient(90deg, #1FBBC2 0%, #67D1AB 100%))",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "14px",
  fontStyle: "normal",
  fontWeight: 510,
  lineHeight: "normal",
  marginTop: "50px",
}));

// Main SignInPage component
const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userLogin = useSelector((state)=> state.userLogin) 
  const { error, loading}= userLogin
  

  const dispatch = useDispatch();

  const formSubmitHander = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <SignInContainer>
      {/* Grid container for alignment */}
      <Grid spacing={2} direction="column">
        {/* Name heading */}
        <Grid item>
          <NameTypography variant="h4">Lock Master</NameTypography>
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
                  Sign In
                </TitleTypography>
              </Grid>
              {error && <p className="para_main text-center pb-2" style={{color:"red"}}>{error}</p>}
              {loading && <div className="text-center pb-2" style={{width:"100%"}}> <Spinner /></div>}
              {/* Form input field for email */}
              <Grid item>
                <FormLabelTypography>Email Address</FormLabelTypography>
                <FormField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  label="@"
                  required
                  fullWidth
                />
              </Grid>
              {/* Form input field for password */}
              <Grid item>
                <FormLabelTypography>Password</FormLabelTypography>
                <FormField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  label="**"
                  fullWidth
                  required
                />
              </Grid>
              {/* Checkbox for "Remember me" and link for "Forgot Password?" */}
              <Grid item>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox color="primary" />}
                      label="Remember me"
                    />
                  </Grid>
                  <Grid item>
                    <Link
                      to="/account-recovery"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="primary">
                        Forgot Password?
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              {/* Button for signing in */}
              <Grid item>
                <RoundedButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign In
                </RoundedButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </SignInContainer>
  );
};
export default SignInPage;
