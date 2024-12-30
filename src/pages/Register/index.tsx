import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import RegisterSVG from "../../components/svg/register";
import LogoSVG from "../../components/svg/logo";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { createUser } from "../../reducers/authSlice";
import { registerUserService } from "../../services/users";


interface RegisterUser {
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError || firstNameError || lastNameError) {
      return;
    }
    const user: RegisterUser = {
      'email': email,
      'password':password,
      'first_name':firstName,
      'last_name': lastName,
    }
    const response = await registerUserService(user);
    if(response){
      navigate('/login')
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const firstname = document.getElementById("first_name") as HTMLInputElement;
    const lastname = document.getElementById("last_name") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (firstname.value.length < 3) {
      setFirstNameError(true);
      setFirstNameErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }

    if (lastname.value.length < 3) {
      setLastNameError(true);
      setLastNameErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setLastNameError(false);
      setLastNameErrorMessage("");
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
                  onChange={(e)=>setEmail(e.target.value)}
                  error={Boolean(emailErrorMessage)}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="first_name"
                  error={Boolean(firstNameErrorMessage)}
                >
                  First Name
                </FormLabel>
                <TextField
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="John"
                  required
                  variant="outlined"
                  size="small"
                  onChange={(e)=>setFirstName(e.target.value)}
                  error={Boolean(firstNameErrorMessage)}
                />
              </FormControl>

              <FormControl>
                <FormLabel
                  htmlFor="last_name"
                  error={Boolean(lastNameErrorMessage)}
                >
                  Last Name
                </FormLabel>
                <TextField
                  id="last_name"
                  type="text"
                  name="last_name"
                  placeholder="Doe"
                  required
                  variant="outlined"
                  size="small"
                  onChange={(e)=>setLastName(e.target.value)}
                  error={Boolean(lastNameErrorMessage)}
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
                  onChange={(e)=>setPassword(e.target.value)}
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
