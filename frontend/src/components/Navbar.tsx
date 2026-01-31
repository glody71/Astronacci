import { BiSearch } from "react-icons/bi";
import { useAuth } from "../context/AuthContext";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const Navbar = ({ search, setSearch }: Props) => {
  const { user, logout } = useAuth();
  const [input, setInput] = useState(search);
  const navigate = useNavigate()

  const handleSearch = () => {
    setSearch(input); 
  };

  const goUpgrade = () => {
    navigate('/membership')
  }

  return (
    <div className="w-full flex items-center justify-between text-white">
      <div className="flex flex-col leading-tight">
        <span className="text-sm text-white/70">Welcome</span>
        <span className="font-semibold">{user?.name ?? "-"}</span>
      </div>

      <div className="gap-2 w-1/2 hidden md:flex">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 rounded-full px-4 py-1 text-white bg-slate-900 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="px-4 py-1 rounded text-white bg-slate-900 flex items-center justify-center hover:cursor-pointer hover:bg-slate-700 transition"
        >
          <BiSearch className="w-5 h-5" />
        </button>
      </div>

      <div>
        {user ? (
          <div className="flex items-center gap-4"  >
            <span
            onClick={() => goUpgrade()}
              className={`text-xs px-3 py-1 rounded-full border border-white/20 capitalize hover:cursor-pointer ${
                user.membership_type === "A"
                  ? "bg-gray-700 text-white"
                  : user.membership_type === "B"
                    ? "bg-blue-800 text-white"
                    : "bg-yellow-500 text-black"
              }`}
            >
              {user.membership_type === "A"
                ? "Basic"
                : user.membership_type === "B"
                  ? "Premium"
                  : "VIP"}
            </span>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-md bg-red-500/90 hover:bg-red-500 transition hover:cursor-pointer"
            >
              <MdLogout className="w-5 h-5" />
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-sm font-medium"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
