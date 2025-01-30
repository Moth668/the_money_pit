import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import MonthlyIncome from "./pages/MonthlyIncome";
import MonthlyExpenses from "./pages/MonthlyExpenses";
import CurrentSavings from "./pages/CurrentSavings";
import InvestmentBalance from "./pages/InvestmentBalance";
//import Home from "./pages/Home"
import App from './app2.tsx'

console.log("Main.tsx is executing...");

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: './pages/MonthlyIncome', element: <MonthlyIncome /> },
      { path: './pages/MonthlyExpenses', element: <MonthlyExpenses /> },
      { path: './pages/CurrentSavings', element: <CurrentSavings /> },
      { path: './pages/InvestmentBalance', element: <InvestmentBalance /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
