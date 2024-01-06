import React, { useEffect } from "react";
import { Grid, Paper, Typography, Button, Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

// Styled component for the container of the sign-in page
const SuccessContainer = styled("div")({
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
const SuccessForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(7),
  borderRadius: 10,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
}));

// Styled component for the rounded button
const ContinueButton = styled(Button)(({ theme }) => ({
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
  fontStyle: "normal",
  fontWeight: 510,
  lineHeight: "normal",
}));

// Styled component for the success icon
const SuccessIcon = styled(Avatar)(({ theme }) => ({
  background: "white",
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(11),
  display: "flex",
  width: "164px",
  height: "164px",
  padding: "5px 5.183px 4.683px 4.5px",
  justifyContent: "center",
  alignItems: "center",
}));

// Styled component for the success message
const SuccessMessage = styled(Typography)(({ theme }) => ({
  color: "#000",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "45px",
  fontWeight: 400,
  textAlign: "center",
  lineHeight: "52px",
  marginBottom: theme.spacing(2),
}));

// Styled component for the success description
const SuccessDescription = styled(Typography)(({ theme }) => ({
  color: "#484848",
  fontFamily: "SF Pro, sans-serif",
  fontSize: "16px",
  textAlign: "center",
  fontWeight: "400",
  marginBottom: theme.spacing(4),
}));

// Success component
const Success = () => {
  useEffect(() => {
    localStorage.removeItem("userRecoveryState");
  }, []);

  const buttonClickHandler = () => {
    localStorage.removeItem("userRecoveryState");
    window.location.reload();
  };

  return (
    <SuccessContainer>
      {/* Grid container for alignment */}
      <Grid spacing={2} direction="column">
        {/* Name heading */}
        <Grid item>
          <NameTypography variant="h4">Kadom</NameTypography>
        </Grid>
        {/* Main form container */}
        <Grid item>
          <SuccessForm>
            {/* Grid container for form elements */}
            <Grid spacing={2} direction="column">
              {/* Title */}
              <Grid item>
                <SuccessIcon>
                  <img
                    src={process.env.PUBLIC_URL + "/images/icons/success.svg"}
                    alt="Success"
                    width="100%"
                    height="100%"
                  />
                </SuccessIcon>
              </Grid>
              {/* Success message */}
              <Grid item>
                <SuccessMessage variant="h4">Successfully</SuccessMessage>
              </Grid>
              {/* Success description */}
              <Grid item>
                <SuccessDescription>
                  Your password has been reset successfully.
                </SuccessDescription>
              </Grid>
              {/* Continue button */}
              <Grid item>
                <ContinueButton
                  onClick={buttonClickHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Continue
                </ContinueButton>
              </Grid>
            </Grid>
          </SuccessForm>
        </Grid>
      </Grid>
    </SuccessContainer>
  );
};

export default Success;
