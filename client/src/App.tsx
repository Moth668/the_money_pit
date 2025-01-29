// import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import PersonalProfile from './components/Profile'

function App(){
  // const [count, setCount] = useState(0)

  return (
    <Router>
        <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/profile" element={<PersonalProfile />} />
        </Routes>
      </Router>
  );
};

export default App
