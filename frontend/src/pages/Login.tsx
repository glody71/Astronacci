import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { login as loginAPI } from "../api/auth.api";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginAPI({ email, password });
      login(res.token);
      navigate("/");
    } catch (error: any) {
      alert(error.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md bg-slate-900 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 transition rounded py-2 font-medium disabled:opacity-50"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="px-3 text-sm text-slate-400">OR</span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        <Link
          to="/register"
          className="w-full flex items-center justify-center border border-slate-700 rounded py-2 hover:bg-slate-800 transition"
        >
          Register
        </Link>

        <a
          href="http://localhost:3000/api/auth/google"
          className="w-full mt-3 flex items-center justify-center gap-3 border border-slate-700 rounded py-2 hover:bg-slate-800 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Login with Google
        </a>
      </div>
    </div>
  );
};

export default Login;
