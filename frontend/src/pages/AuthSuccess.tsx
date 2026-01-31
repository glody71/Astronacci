import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      login(token);
      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <p>Signing you in...</p>
    </div>
  );
};

export default AuthSuccess;
