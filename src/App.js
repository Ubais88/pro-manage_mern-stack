import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Sidebar from "./pages/sidebar/Sidebar.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Analytics from "./components/Analytics/Analytics";
import Settings from "./components/Settings/Settings.js";
import ViewChecklist from "./pages/viewChecklist/ViewChecklist.js";

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
        <Route path="/view/checklist/:cardId" element={<ViewChecklist/>} />
      </Routes>
    </div>
  );
};

export default App;


{/* <div class="custom-loader"></div> */}