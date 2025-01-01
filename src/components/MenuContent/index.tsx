import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from "react-redux";
import { logout } from "../../reducers/authSlice";

const mainListItems = [
  { text: "Dashboard", icon: <HomeRoundedIcon />, link: "/dashboard" },
  { text: "Project", icon: <AnalyticsRoundedIcon />, link: "/project" },
];




const MenuContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = React.useState(0);


  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleAction = (text:string) => {
    if(text === "Account"){
      navigate('/account')
    }

    if(text === "Logout"){
      localStorage.clear();
      dispatch(logout());
      navigate('/login')
    }
  }

  const secondaryListItems = [
    { text: "Logout", icon: <LogoutIcon /> },
  ];


  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={index === selectedIndex}
              component={Link}
              to={item.link}
              onClick={() => handleListItemClick(index)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleAction(item.text)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default MenuContent;
