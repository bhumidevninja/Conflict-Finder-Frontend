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
      <CssBaseline enableColorScheme />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url("https://png.pngtree.com/png-clipart/20230920/original/pngtree-people-team-working-on-computer-together-look-student-drawing-vector-png-image_12700079.png")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

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
            }}
          >
            <Box
              component="a"
              href="/login"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <img
                src="https://img.icons8.com/pulsar-gradient/48/project.png"
                alt="Link Image"
                style={{
                  objectFit: "cover",
                  borderRadius: 4,
                }}
              />
            </Box>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                marginBottom: "1rem",
                fontSize: "clamp(2rem, 10vw, 2.15rem)",
              }}
            >
              SIGN UP
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
                <FormLabel
                  htmlFor="email"
                  error={emailErrorMessage ? true : false}
                >
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
                  error={emailErrorMessage ? true : false}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="fullname"
                  error={fullNameErrorMessage ? true : false}
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
                  error={fullNameErrorMessage ? true : false}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="password"
                  error={passwordErrorMessage ? true : false}
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
                  error={passwordErrorMessage ? true : false}
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
                Already having account?
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="body1"
                  sx={{
                    marginTop: "1rem",
                    textDecoration: "none",
                  }}
                >
                  click here
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
