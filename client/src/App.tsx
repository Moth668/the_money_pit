import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewProfileCard from "./components/UserProfile/ViewProfileCard";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import "./App.css";
import bunkerPig from "./assets/bunkerPig.png";
import Dashboard from "./pages/Dashboard";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
  return (
    <Router>
      <img src={bunkerPig} alt="The Money Pit logo" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ViewProfileCard" element={<ViewProfileCard />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
