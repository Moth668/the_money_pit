
import React, { useState, useEffect } from "react";
import { Drawer, Box, Button, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from "@mui/material";
import { Home, AttachMoney, MoneyOff, TrendingUp, ListAlt, Menu as MenuIcon } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
import auth from "../utils/auth";
import elon from "../../../assets/Elon_Musk.jpg"
import favicon from "../../../assets/image.png"

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

import { Avatar } from "../components/ui/avatar"

const Demo = () => {
  return <Avatar name="Elon Musk" src={elon} size="xs" />
}


const Dashboard: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  // const userRole = auth.;  // Get the user role (assuming this function exists)

  const menuItems: MenuItem[] = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Income", icon: <AttachMoney />, path: "/MonthlyIncome" },
    { text: "Expenses", icon: <MoneyOff />, path: "/MonthlyExpenses" },
    { text: "Savings", icon: <TrendingUp />, path: "/CurrentSavings" },
    { text: "Investments", icon: <ListAlt />, path: "/InvestmentBalance" },
    { text: "Profile", icon: <Demo />, path: "/ViewProfileCard" },
  ];

  useEffect(() => {
    setIsLoggedIn(auth.loggedIn());
  });

  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      The Money Pit
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute", // Make sure it stays on top
          top: 10,
          left: 10,
          zIndex: 1300, // Ensure it's above the Drawer
          backgroundColor: isDrawerOpen ? "black" : "white", 
          color: isDrawerOpen ? "white" : "black", 
          transition: "background-color 0.3s ease, opacity 0.3s ease",
          "&:hover": {
            backgroundColor: isDrawerOpen ? "rgba(0, 0, 0, 0.65)" : "rgba(255, 255, 255, 0.65)", // Slightly reduced transparency
            opacity: 1, // Ensures it does not become too transparent
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        variant={isDrawerOpen ? "permanent" : "temporary"} // "permanent" on large screens, "temporary" on small screens
        open={isDrawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
          <List>
            <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
              <img src={favicon} alt="Money Pit Favicon" style={{ width: "80%", height: "auto" }} />
            </Box>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link as React.ElementType}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={() => setIsDrawerOpen(false)}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor:
                    location.pathname === item.path
                      ? "primary.main"
                      : "white",
                  "&:hover": {
                    backgroundColor:
                      location.pathname === item.path
                        ? "primary.dark"
                        : "action.hover",
                  },
                }}
              >
                <Tooltip title={item.text} placement="right">
                  <ListItemIcon>{item.icon}</ListItemIcon>
                </Tooltip>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ mt: "auto", p: 2, textAlign: "center", display: "flex", flexDirection: "row", justifyContent: "center", gap: 1 }}>
          {(isLoggedIn) ? (
            <>
              <Button onClick={() => auth.logout()} variant="contained"
              >Logout</Button>
              <Tooltip title="Logout" placement="left">
                <></>
              </Tooltip>
            </>
          ) : (
            <>
              <Button component={Link} to="/LoginForm" variant="contained"
                onClick={() => setIsDrawerOpen(false)}
              >Login</Button>
              <Tooltip title="Login" placement="left">
                <></>
              </Tooltip>
              <Button component={Link} to="/SignUpForm" variant="contained"
                onClick={() => setIsDrawerOpen(false)}
                sx={{ mt: "1", textAlign: "center" }}
              >Sign Up</Button>
              <Tooltip title="Login" placement="left">
                <></>
              </Tooltip>
            </>
            
          )}
        </Box>
      </Drawer>
    </>
  );
};
export default Dashboard;

