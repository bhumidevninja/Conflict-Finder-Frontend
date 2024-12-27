import { Box, Stack } from "@mui/material";
import { alpha } from '@mui/material/styles';
import SideMenu from "../../components/SideMenu";
import Header from "../../components/Header";
import MainGrid from "../../components/MainGrid";

const Dashboard = () => {
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
            <MainGrid />
          </Stack>
        </Box>
      </Box>
    </div>
  );
};

export default Dashboard;
