import React, { useState, useEffect } from "react";
import {
  Drawer,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Home,
  AttachMoney,
  MoneyOff,
  TrendingUp,
  ListAlt,
  Menu as MenuIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { useLocation, Link, Outlet } from "react-router-dom";
import auth from "../utils/auth";
import favicon from "../../../assets/Adobe Express - file.png";
import ViewProfileCard from "../components/UserProfile/ViewProfileCard";

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path?: string; // Optional because Profile will have a different behavior
}

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isProfileVisible, setIsProfileVisible] = useState<boolean>(false); // Controls profile card visibility

  useEffect(() => {
    setIsLoggedIn(auth.loggedIn());
  });

  const toggleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleProfileCard = (): void => {
    setIsProfileVisible(!isProfileVisible);
  };

  const menuItems: MenuItem[] = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Income", icon: <AttachMoney />, path: "/MonthlyIncome" },
    { text: "Expenses", icon: <MoneyOff />, path: "/MonthlyExpenses" },
    { text: "Savings", icon: <TrendingUp />, path: "/CurrentSavings" },
    { text: "Investments", icon: <ListAlt />, path: "/InvestmentBalance" },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Toggle Sidebar Button */}
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 1300,
          backgroundColor: isDrawerOpen ? "black" : "white",
          color: isDrawerOpen ? "white" : "black",
          transition: "background-color 0.3s ease, opacity 0.3s ease",
          "&:hover": {
            backgroundColor: isDrawerOpen
              ? "rgba(0, 0, 0, 0.65)"
              : "rgba(255, 255, 255, 0.65)",
            opacity: 1,
          },
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar Drawer */}
      <Drawer
        variant={isDrawerOpen ? "permanent" : "temporary"}
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
              <img
                src={favicon}
                alt="Money Pit Favicon"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>

            {/* Menu Items */}
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                component={Link as React.ElementType}
                to={item.path ?? "#"}
                selected={location.pathname === item.path}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  backgroundColor:
                    location.pathname === item.path ? "primary.main" : "white",
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

            {/* Profile Button (Toggles ViewProfileCard) */}
            <ListItem
              component="li"
              onClick={toggleProfileCard} // Toggle ProfileCard visibility
              sx={{
                backgroundColor: isProfileVisible ? "primary.main" : "white",
                "&:hover": {
                  backgroundColor: isProfileVisible
                    ? "primary.dark"
                    : "action.hover",
                },
              }}
            >
              <Tooltip title="Profile" placement="right">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
              </Tooltip>
              <ListItemText primary="Profile" />
            </ListItem>
          </List>
        </Box>

        {/* Login/Logout Buttons */}
        <Box
          sx={{
            mt: "auto",
            p: 2,
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 1,
          }}
        >
          {isLoggedIn ? (
            <Button onClick={() => auth.logout()} variant="contained">
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/LoginForm" variant="contained">
                Login
              </Button>
              <Button
                component={Link}
                to="/SignUpForm"
                variant="contained"
                sx={{ mt: "1", textAlign: "center" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Conditionally Show Profile Card */}
        {isProfileVisible && (
          <Box sx={{ flexShrink: 0 }}>
            <ViewProfileCard />
          </Box>
        )}

        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: "20px" }}>
          <Outlet /> {/* This will render the current page */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
