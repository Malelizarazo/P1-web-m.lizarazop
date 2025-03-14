import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Robots from "./pages/Robots"; // This will be implemented later

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/robots" element={<Robots />} />
        <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect to login by default */}
      </Routes>
    </Router>
  );
}

export default App;

