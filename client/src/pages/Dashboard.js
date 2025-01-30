import React, { useEffect, useState } from "react";
import { Drawer, Box, List, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton } from "@mui/material";
import { Home, AttachMoney, MoneyOff, TrendingUp, ListAlt, Settings, Menu as MenuIcon } from "@mui/icons-material";
import { useLocation, Link } from "react-router-dom";
import { auth } from "path-to-auth-module"; // adjust the import as per your file structure
const Dashboard = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const userRole = auth.getUserRole(); // Get the user role (assuming this function exists)
    const menuItems = [
        { text: "Home", icon: React.createElement(Home, null), path: "/" },
        { text: "Income", icon: React.createElement(AttachMoney, null), path: "/MonthlyIncome" },
        { text: "Expenses", icon: React.createElement(MoneyOff, null), path: "/MonthlyExpenses" },
        { text: "Savings", icon: React.createElement(TrendingUp, null), path: "/CurrentSavings" },
        { text: "Investments", icon: React.createElement(ListAlt, null), path: "/CurrentInvestments" },
        ...(userRole === "admin" ? [{ text: "Settings", icon: React.createElement(Settings, null), path: "/settings" }] : []),
    ];
    useEffect(() => {
        setIsLoggedIn(auth.isLoggedIn());
    });
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Drawer, { variant: isDrawerOpen ? "permanent" : "temporary", open: isDrawerOpen, onClose: toggleDrawer, sx: {
                width: 240,
                "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                },
            } },
            React.createElement(Box, { sx: { display: "flex", flexDirection: "column", height: "100%" } },
                React.createElement(List, null,
                    React.createElement(Box, { sx: { display: "flex", justifyContent: "center", p: 2 } },
                        React.createElement("img", { src: "server\\src\\assets\\image.png", alt: "Money Pit Logo", style: { width: "80%", height: "auto" } })),
                    menuItems.map((item) => (React.createElement(ListItem, { key: item.text, component: Link, to: item.path, selected: location.pathname === item.path, sx: {
                            textDecoration: "none",
                            color: "inherit",
                            backgroundColor: location.pathname === item.path ? "primary.main" : "transparent",
                            "&:hover": {
                                backgroundColor: location.pathname === item.path ? "primary.dark" : "action.hover",
                            },
                        } },
                        React.createElement(Tooltip, { title: item.text, placement: "right" },
                            React.createElement(ListItemIcon, null, item.icon)),
                        React.createElement(ListItemText, { primary: item.text }))))))),
        React.createElement(IconButton, { onClick: toggleDrawer },
            React.createElement(MenuIcon, null))));
};
export default Dashboard;
