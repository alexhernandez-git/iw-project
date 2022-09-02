import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import Login from "./containers/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
