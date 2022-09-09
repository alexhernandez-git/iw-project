import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import Login from "./containers/login";
import NewProcedure from "./containers/new-procedure";
import NewProcedureType from "./containers/new-procedure-type";
import Procedures from "./containers/procedures";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/procedures"} element={<Procedures />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/new-procedure"} element={<NewProcedureType />} />
        <Route path={"/new-procedure/:type"} element={<NewProcedure />} />
      </Routes>
    </Router>
  );
}

export default App;
