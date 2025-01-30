import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MonthlyIncome from "./pages/MonthlyIncome";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import CurrentSavings from "./pages/CurrentSavings";
import InvestmentBalance from "./pages/InvestmentBalance";
import Home from "./pages/Home"
import App from './app2.tsx'

console.log("Main.tsx is executing...");

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'monthly-income', element: <MonthlyIncome /> },
      { path: 'monthly-expenses', element: <MonthlyExpenses /> },
      { path: 'current-savings', element: <CurrentSavings /> },
      { path: 'investment-balance', element: <InvestmentBalance /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
