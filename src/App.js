import React from "react";
import { Route, Routes } from "react-router-dom";
import './App.css'
import Auth from "./pages/auth/Auth";
import Sidebar from "./pages/sidebar/Sidebar.js";
import Dashboard from "./components/dashboard/Dashboard";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings.js";



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
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;