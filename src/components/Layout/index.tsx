import React from "react";
import { Box, Stack } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";

const Layout = ({ children }: { children: any }) => {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {children}
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export const PublicLayout = ({ children }: { children: any }) => {
  return <React.Fragment>{children}</React.Fragment>;
};
export default Layout;
