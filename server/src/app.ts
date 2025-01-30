import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard"; 
import MonthlyIncome from "./pages/MonthlyIncome";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import CurrentSavings from "./pages/CurrentSavings";
import InvestmentBalance from "./pages/InvestmentBalance";

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Router>
        <Box>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/monthly-income" element={<MonthlyIncome />} />
            <Route path="/monthly-expenses" element={<MonthlyExpenses />} /> 
            <Route path="/current-savings" element={<CurrentSavings />} />
            <Route path="/investment-balance" element={<InvestmentBalance />} />
            {/* Add more routes here as needed */}
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App;
