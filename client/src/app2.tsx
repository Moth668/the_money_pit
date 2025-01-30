import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import Dashboard from "../../client/src/pages/Dashboard"; 
import MonthlyIncome from "../../client/src/pages/MonthlyIncome";
import MonthlyExpenses from "../../client/src/pages/MonthlyExpenses";
import CurrentSavings from "../../client/src/pages/CurrentSavings";
import InvestmentBalance from "../../client/src/pages/InvestmentBalance";

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
