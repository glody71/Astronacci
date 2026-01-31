import { useState } from "react";
import { register } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register({ name, email, password });
      alert("Berhasil");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Register gagal");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md bg-slate-900 rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition rounded py-2 font-medium disabled:opacity-50"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
