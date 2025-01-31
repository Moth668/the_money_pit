import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewProfile from "./components/ViewProfile";
import UpdateProfile from "./components/UpdateProfile";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
