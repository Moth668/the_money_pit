import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MonthlyIncome from "./pages/MonthlyIncome";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import CurrentSavings from "./pages/CurrentSavings";
import InvestmentBalance from "./pages/InvestmentBalance";
import Home from "./pages/Home";
import App from "./app2";
import LoginForm from "./components/LoginForm";
import ViewProfileCard from "./components/UserProfile/ViewProfileCard";
import ViewWallet from "./components/UserProfile/Wallet";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import SignupForm from "./components/SignupForm";

console.log("Main.tsx is executing...");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'MonthlyIncome', element: <MonthlyIncome /> },
      { path: 'MonthlyExpenses', element: <MonthlyExpenses /> },
      { path: 'CurrentSavings', element: <CurrentSavings /> },
      { path: 'InvestmentBalance', element: <InvestmentBalance /> },
      { path: 'LoginForm', element: <LoginForm /> },
      { path: "ViewProfileCard", element: <ViewProfileCard /> },
      { path: "Wallet", element: <ViewWallet /> },
      { path: "update-profile", element: <UpdateProfile /> },
      { path: 'SignupForm', element: <SignupForm /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
