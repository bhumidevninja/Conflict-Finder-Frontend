import React, { FormEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";


const ResetPasswordForm: React.FC = () => {

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  //   const { password, confirmPassword } = passwords;

  //   const errors: Passwords = {
  //     password:
  //       password.length >= 8
  //         ? ""
  //         : "Password must be at least 8 characters long.",
  //     confirmPassword:
  //       password === confirmPassword ? "" : "Passwords do not match.",
  //   };

  //   setPasswordErrors(errors);

  //   if (Object.values(errors).every((error) => error === "")) {
  //     alert("Password reset successfully!");
  //     console.log("Email:", email);
  //     console.log("Passwords:", passwords);
  //   }
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
          <Box
            sx={{
              width: "100%",
              maxWidth: "400px",
              textAlign: "center",
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
                textAlign: "left",
              }}
            >
              Forgot Password
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => handlePasswordSubmit(e)}
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
                  Click to Sent Mail
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            backgroundImage: `url("https://img.freepik.com/premium-vector/forgot-password-concept-isolated-white_263070-194.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </React.Fragment>
  );
};

export default ResetPasswordForm;
