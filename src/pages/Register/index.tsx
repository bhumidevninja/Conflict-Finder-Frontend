import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

import RegisterSVG from "../../components/svg/register";
import LogoSVG from "../../components/svg/logo";

const Register = () => {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [fullNameError, setFullNameError] = useState(false);
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (emailError || passwordError || fullNameError) {
      event.preventDefault();
      return;
    }
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      fullname: data.get("fullname"),
    });
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const fullname = document.getElementById("fullname") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (fullname.value.length < 3) {
      setFullNameError(true);
      setFullNameErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setFullNameError(false);
      setFullNameErrorMessage("");
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
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "1fr 1fr",
          height: "100vh",
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
          }}
        >
          <LogoSVG />
        </Box>

        <Box
          sx={{
            gridColumn: "1 / 2",
            gridRow: "2 / 3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <RegisterSVG />
        </Box>

        <Box
          sx={{
            gridColumn: "2 / 3",
            gridRow: "2 / 3",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                marginBottom: "1rem",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
                textAlign: "center"
              }}
            >
              Sign up
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
                <FormLabel htmlFor="email" error={Boolean(emailErrorMessage)}>
                  Email
                </FormLabel>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john.deo@email.com"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(emailErrorMessage)}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="fullname"
                  error={Boolean(fullNameErrorMessage)}
                >
                  Full Name
                </FormLabel>
                <TextField
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="John Doe"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(fullNameErrorMessage)}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="password"
                  error={Boolean(passwordErrorMessage)}
                >
                  Password
                </FormLabel>
                <TextField
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  error={Boolean(passwordErrorMessage)}
                />
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={validateInputs}
                sx={{
                  textTransform: "capitalize",
                  backgroundColor: "#000",
                  marginTop: 3,
                }}
              >
                <Typography variant="button" fontWeight="bold">
                  Sign up
                </Typography>
              </Button>
              <div style={{ textAlign: "center" }}>
                Already having account?{" "}
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body1"
                  sx={{
                    marginTop: "1rem",
                    textDecoration: "none",
                  }}
                >
                  Click here
                </Link>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Register;
