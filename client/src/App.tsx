import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import Login from "./containers/login";
import NewExpedient from "./containers/new-expedient";
import Expedients from "./containers/expedients";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/expedients"} element={<Expedients />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/new-expedient"} element={<NewExpedient />} />
      </Routes>
    </Router>
  );
}

export default App;
