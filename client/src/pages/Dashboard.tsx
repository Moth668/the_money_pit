import React, { useState } from "react";
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from "@mui/material";
import { Home, AttachMoney, MoneyOff, TrendingUp, ListAlt, Menu as MenuIcon } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
// import { auth } from "path-to-auth-module";  // adjust the import as per your file structure


interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  // const userRole = auth.getUserRole();  // Get the user role (assuming this function exists)

  const menuItems: MenuItem[] = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Income", icon: <AttachMoney />, path: "/MonthlyIncome" },
    { text: "Expenses", icon: <MoneyOff />, path: "/MonthlyExpenses" },
    { text: "Savings", icon: <TrendingUp />, path: "/CurrentSavings" },
    { text: "Investments", icon: <ListAlt />, path: "/InvestmentBalance" },
  ];


  // useEffect(() => {
  //   setIsLoggedIn(auth.isLoggedIn()); 
  // });

  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  console.log("Hello World!");

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute", // Make sure it stays on top
          top: 10,
          left: 10,
          zIndex: 1300, // Ensure it's above the Drawer
          backgroundColor: "white", // Optional: Make it visible if background is dark
        }}
      >
        <MenuIcon />
      </IconButton>

      <h1>Dashboard Loaded</h1>
      <Drawer
        variant={isDrawerOpen ? "permanent" : "temporary"}  // "permanent" on large screens, "temporary" on small screens
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
              <img src="./src/assets/image.png" alt="Money Pit Favicon" style={{ width: "80%", height: "auto" }} />
              <h1>The Money Pit</h1>
            </Box>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link as React.ElementType}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor: location.pathname === item.path ? "primary.main" : "transparent",
                  "&:hover": {
                    backgroundColor: location.pathname === item.path ? "primary.dark" : "action.hover",
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
      </Drawer>
    </>
  );
};

export default Dashboard;
