import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";

const ButtonAppBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          backgroundColor: "transparent",
          color: "black",
          boxShadow: "none",
          overflow:"hidden"
        }}
      >
        <Toolbar>
          <Link
            href="/login"
            variant="h6"
            component="a"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            DTCF
          </Link>
          <Button style={{ color: "black" }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
