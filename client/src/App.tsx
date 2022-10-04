import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import Login from "./containers/login";
import NewExpedient from "./containers/new-expedient";
import Expedients from "./containers/expedients";
import ExpedientsTypes from "./containers/expedients-types";
import ExpedientsTypesView from "./containers/expedients-types-view";
import ExpedientsTypesNew from "./containers/expedients-types-new";
import ExpedientsTypesEdit from "./containers/expedients-types-edit";
import ExpedientsView from "./containers/expedients-view";
import ExpedientsEdit from "./containers/expedients-edit";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={"/expedients"} element={<Expedients />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/new-expedient"} element={<NewExpedient />} />
        <Route path={"/expedients-types"} element={<ExpedientsTypes />} />
        <Route
          path={"/expedients-types/view"}
          element={<ExpedientsTypesView />}
        />
        <Route
          path={"/expedients-types/new"}
          element={<ExpedientsTypesNew />}
        />
        <Route
          path={"/expedients-types/edit/:id"}
          element={<ExpedientsTypesEdit />}
        />
        <Route path={"/expedients/:id"} element={<ExpedientsView />} />
        <Route path={"/expedients/edit/:id"} element={<ExpedientsEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
