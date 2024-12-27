import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    vars: {
      palette: {
        action: {
          disabled: string;
        };
        background: {
          defaultChannel: string;
        };
      };
    };
  }

  interface ThemeOptions {
    vars?: {
      palette?: {
        action?: {
          disabled: string;
        };
        background: {
          defaultChannel: string;
        };
      };
    };
  }
}

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input:focus": {
            color: "black",
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
  palette: {
    background: {
      default: "#fafafa",
    },
  },
  cssVariables: true,
  vars: {
    palette: {
      action: {
        disabled: "#9e9e9e",
      },
      background: {
        defaultChannel: "240, 240, 240",
      },
    },
  },
});

export default theme;
