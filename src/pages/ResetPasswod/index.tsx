import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";
import FogotPasswordSVG from "../../components/svg/forgotPassword";
import LogoSVG from "../../components/svg/logo";

const ResetPasswordForm: React.FC = () => {

  
  const [emailErrorMessage, setEmailErrorsMessage] = useState<string|null>(null);

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = false;
    const email = document.getElementById("email") as HTMLInputElement;
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailErrorsMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailErrorsMessage(null);
      isValid = true;
    }
    return isValid;

  };

  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          component="a"
          href="/login"
          sx={{
            gridColumn: "1 / 2",
            gridRow: "1 / 2",
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
            cursor: "pointer",
            textDecoration: "none",
            padding: "1rem",
          }}
        >
          <LogoSVG />
        </Box>
        <FogotPasswordSVG />
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                marginBottom: "2rem",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                textAlign: "center",
              }}
            >
              Forgot Password
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => handleEmailSubmit(e)}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <FormControl>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email Address"
                  placeholder="john.deo@email.com"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  helperText={emailErrorMessage}
                  error={Boolean(emailErrorMessage)}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#000",
                  marginTop: 3,
                }}
              >
                <Typography variant="button" fontWeight="bold">
                  Click to Send Mail
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ResetPasswordForm;
