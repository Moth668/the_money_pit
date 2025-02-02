import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MonthlyIncome from "./pages/MonthlyIncome";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import CurrentSavings from "./pages/CurrentSavings";
import InvestmentBalance from "./pages/InvestmentBalance";
import Home from "./pages/Home";
import App from "./app2";
// import ViewProfile from "./components/ViewProfile";


console.log("Main.tsx is executing...");

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "MonthlyIncome", element: <MonthlyIncome /> },
      { path: "MonthlyExpenses", element: <MonthlyExpenses /> },
      { path: "CurrentSavings", element: <CurrentSavings /> },
      { path: "InvestmentBalance", element: <InvestmentBalance /> },
      // { path: "Profile", element: <ViewProfile /> },
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
