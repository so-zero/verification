import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ForgotPassword from "./pages/ForgotPassword";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <Loading />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <RedirectUser>
              <Register />
            </RedirectUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectUser>
              <Login />
            </RedirectUser>
          }
        />
        <Route path="/verify-email" element={<EmailVerify />} />
        <Route
          path="/forgot-password"
          element={
            <RedirectUser>
              <ForgotPassword />
            </RedirectUser>
          }
        />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
