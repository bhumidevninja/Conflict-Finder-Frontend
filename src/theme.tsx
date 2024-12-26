import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input:focus": {
            color: "black", // Set text color to black when focused
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
              borderColor: "black",
            },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "black",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
