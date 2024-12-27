import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import LogoSVG from "../../components/svg/logo";
import FogotPasswordSVG from "../../components/svg/forgotPassword";

type Passwords = {
  password: string;
  confirmPassword: string;
};

const ConfirmPassword: React.FC = () => {
  // const [email, setEmail] = useState<string|null>(null);
  const [passwords, setPasswords] = useState<Passwords>({
    password: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Passwords>({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { password, confirmPassword }: Passwords = passwords;
    const errors: Passwords = {
      password:
        password.length >= 8
          ? ""
          : "Password must be at least 8 characters long.",
      confirmPassword:
        password === confirmPassword ? "" : "Passwords do not match.",
    };

    setPasswordErrors(errors);

    if (Object.values(errors).every((error) => error === "")) {
      alert("Password reset successfully!");
      // console.log("Email:", email);
      // console.log("Passwords:", passwords);
    }
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
              Forget Password Form
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
                  value="john.deo@email.com"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  disabled
                />
              </FormControl>

              <FormControl>
                <TextField
                  id="password1"
                  type="text"
                  name="password1"
                  label="Password"
                  placeholder=""
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) =>
                    setPasswords({ ...passwords, password: e.target.value })
                  }
                  helperText={passwordErrors.password}
                  error={passwordErrors.password ? true : false}
                />
              </FormControl>

              <FormControl>
                <TextField
                  id="password2"
                  type="password"
                  name="password2"
                  label="Confirm Password"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  onChange={(e) =>
                    setPasswords({
                      ...passwords,
                      confirmPassword: e.target.value,
                    })
                  }
                  helperText={passwordErrors.confirmPassword}
                  error={passwordErrors.confirmPassword ? true : false}
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
                  Set Password
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ConfirmPassword;
