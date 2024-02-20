import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'
import Auth from "./pages/auth/Auth.js";
import Sidebar from "./components/sidebar/Sidebar";
import Dashboard from "./components/dashboard/Dashboard.js";
import Analytics from "./components/Analytics/Analytics.js";



const App = () => {
  
  return (
    <div style={{ display: "flex" }}>
      <Routes>
      <Route path="/" element={<Auth />} />
        <Route
          path="/*"
          element={
            <div className="homeComponents">
              <Sidebar />
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;