import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

const Login = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
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
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <img
            src="https://img.icons8.com/pulsar-gradient/48/project.png"
            alt="logo"
          />
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              //   textAlign: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                marginBottom: "1rem",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                textAlign: "center",
              }}
            >
              Welcome Back
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email" error={emailErrorMessage? true:false}>Email</FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john.deo@email.com"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={emailErrorMessage? true:false}
                  helperText={emailErrorMessage}
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password" error={passwordErrorMessage? true:false}>Password</FormLabel>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={passwordErrorMessage? true:false}
                  helperText={passwordErrorMessage}
                />
                <div style={{ textAlign: "right", fontSize: "12px" }}>
                  Forgot Password?
                  <Link
                    component={RouterLink}
                    to="/forgot-password"
                    variant="body1"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                      fontSize: "12px",
                    }}
                  >
                    Click here
                  </Link>
                </div>
              </FormControl>

              <Button
                fullWidth={false}
                type="submit"
                variant="contained"
                onClick={validateInputs}
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#000",
                  marginTop: 3,
                }}
              >
                <Typography variant="button" fontWeight="bold">
                  Sign in
                </Typography>
              </Button>

              <div style={{ textAlign: "center" }}>
                Don't have account?
                <Link
                  component={RouterLink}
                  to="/register"
                  variant="body1"
                  sx={{
                    marginTop: "1rem",
                    textDecoration: "none",
                    color: "primary.main",
                  }}
                >
                  Sign up
                </Link>
              </div>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundImage: `url("https://png.pngtree.com/png-clipart/20221021/original/pngtree-diverse-people-working-on-computer-together-solving-business-problem-png-image_8709874.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default Login;