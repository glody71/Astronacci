import { Navigate, Route, Routes } from "react-router-dom";
import ContentList from "../pages/ContentList";
import ContentDetails from "../pages/ContentDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthSuccess from "../pages/AuthSuccess";
import { useAuth } from "../context/AuthContext";
import UpgradeMembership from "../pages/UpgradeMembership";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ContentList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth/success" element={<AuthSuccess />} />

      <Route
        path="/contents/:id"
        element={
          <PrivateRoute>
            <ContentDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/membership"
        element={
          <PrivateRoute>
            <UpgradeMembership />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
