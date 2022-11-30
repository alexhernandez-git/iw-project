import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
import Login from "./containers/login";
import NewExpedient from "./containers/expedients-new";
import Expedients from "./containers/expedients";
import ExpedientsTypes from "./containers/expedients-types";
import ExpedientsTypesView from "./containers/expedients-types-view";
import ExpedientsTypesNew from "./containers/expedients-types-new";
import ExpedientsTypesEdit from "./containers/expedients-types-edit";
import ExpedientsView from "./containers/expedients-view";
import ExpedientsEdit from "./containers/expedients-edit";
import ProtectedRoute from "./components/protected-route";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { getUser } from "./store/user";
import ProtectedAdminRoute from "./components/protected-admin-route";

function App() {
  const state = useSelector((state: RootState) => state);

  console.log({ state });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route
          path={"/"}
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path={"/expedients"}
          element={
            <ProtectedRoute>
              <Expedients />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/expedients/new"}
          element={
            <ProtectedRoute>
              <NewExpedient />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/expedients/new/:vinculated"}
          element={
            <ProtectedRoute>
              <NewExpedient />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/expedients-types"}
          element={
            <ProtectedAdminRoute>
              <ExpedientsTypes />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={"/expedients-types/:id"}
          element={
            <ProtectedAdminRoute>
              <ExpedientsTypesView />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={"/expedients-types/new"}
          element={
            <ProtectedAdminRoute>
              <ExpedientsTypesNew />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={"/expedients-types/edit/:id"}
          element={
            <ProtectedAdminRoute>
              <ExpedientsTypesEdit />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path={"/expedients/:id"}
          element={
            <ProtectedRoute>
              <ExpedientsView />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/expedients/:id/*"}
          element={
            <ProtectedRoute>
              <ExpedientsView />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/expedients/edit/:id"}
          element={
            <ProtectedRoute>
              <ExpedientsEdit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
