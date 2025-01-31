import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Provider } from "@/components/ui/provider";
// import { Route } from 'react-router-dom';
// import Home from "./pages/Home";
// import MonthlyIncome from "./pages/MonthlyIncome";
// import MonthlyExpenses from "./pages/MonthlyExpenses";
// import CurrentSavings from "./pages/CurrentSavings";
// import InvestmentBalance from "./pages/InvestmentBalance";


// Debug Component to Log Current Location
const DebugLocation: React.FC = () => {
  const location = useLocation();
  console.log('Current Path:', location.pathname);
  return null; // This component doesn't render anything on the UI
};

// Layout Component for Navigation and Main Content
const App: React.FC = () => {
  return (
      <Provider>
        <h1>The Money Pit</h1>
        <DebugLocation />
        {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monthly-income" element={<MonthlyIncome />} />
        <Route path="/monthly-expenses" element={<MonthlyExpenses />} />
        <Route path="/current-savings" element={<CurrentSavings />} />
        <Route path="/investment-balance" element={<InvestmentBalance />} />
        </Routes> */}
        <Outlet />
      </Provider>
  );
};

export default App;
