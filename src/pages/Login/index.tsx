import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import LoginSVG from "../../components/svg/login";
import LogoSVG from "../../components/svg/logo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUserInfo, loginUser } from "../../reducers/authSlice";
import { Alert, CircularProgress } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { loading, user, tokens, errorMessage } = useSelector((state:any) => state.auth);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {
      return;
    }
    const userData = {
      email: email,
      password: password,
    };
    if (userData.email != null && userData.password != null){
      dispatch(loginUser(userData));
    }
  };

  useEffect(() => {
    if (tokens && !user) {
      dispatch(fetchUserInfo());
      navigate('/dashboard');
    }
  }, [tokens, user, dispatch]);

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

    if (!password.value || password.value.length < 3) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 3 characters long.");
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
        

        
        <LoginSVG />
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
            {errorMessage?
              <Box sx={{paddingY:2}}>
                <Alert severity="error">{errorMessage}</Alert>
              </Box>:null
            }
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
                  onChange={(event)=>setEmail(event?.target.value)}
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
                  onChange={(event)=>setPassword(event?.target.value)}
                  error={passwordErrorMessage? true:false}
                  helperText={passwordErrorMessage}
                />
                <div style={{ textAlign: "right", fontSize: "12px" }}>
                  Forgot Password?&nbsp;
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
                {loading ? 
                <CircularProgress size="30px" style={{color:'white'}}/>:
                <Typography variant="button" fontWeight="bold">
                  Sign in
                </Typography>}
              </Button>

              <div style={{ textAlign: "center" }}>
                Don't have account?&nbsp;
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
      </Box>
    </React.Fragment>
  );
};

export default Login;
