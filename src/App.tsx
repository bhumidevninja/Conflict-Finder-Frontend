import "./App.css";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainGrid from "./components/MainGrid";
import FormDetail from "./components/FormDetail";
import Layout, { PublicLayout } from "./components/Layout";
import ResetPasswordForm from "./pages/ResetPasswod";
import ConfirmPassword from "./pages/ConfirmPassword";

// import PrivateRoute from "./routes/PrivateRoute";
// import PublicRoute from "./routes/PublicRoute";

const PrivateRoute = ({ children }: { children: any }) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    <Layout>{children}</Layout>
  );
};

const PublicRoute = ({ children }:{children:any}) => {
  const isAuthenticated = localStorage.getItem("auth") === "true";
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
  return <PublicLayout>{children}</PublicLayout>;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          <Route
            path="/"
            element={
              <Navigate to="/dashboard" replace />
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainGrid />
              </PrivateRoute>
            }
          />

          <Route
            path="/project"
            element={
              <PrivateRoute>
                <FormDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ResetPasswordForm />
              </PublicRoute>
            }
          />

          <Route
            path="/confirm-password"
            element={
              <PublicRoute>
                <ConfirmPassword />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
