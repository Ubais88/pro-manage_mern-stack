import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth.js";
import "./App.css";

const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </div>
  );
};

export default App;
