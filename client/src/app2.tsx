import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Provider } from "@/components/ui/provider";

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
        <h1>App Loaded</h1>
          <DebugLocation />
          <Outlet />
      </Provider>
  );
};

export default App;
