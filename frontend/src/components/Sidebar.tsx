import { FaFileAlt, FaVideo, FaUser, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-slate-950 text-white flex flex-col shadow-lg">
      {/* Logo / Nama Aplikasi */}
      <Link to={'/'}>
        <div className="px-5 py-4 border-b border-white/20 flex items-center gap-2">
          <FaFileAlt className="w-6 h-6 text-blue-500" />
          <span className="text-xl font-bold tracking-wide">ContentHub</span>
        </div>
      </Link>

      {/* Menu */}
      <nav className="flex-1 px-2 py-4 space-y-2 overflow-auto">
        <button className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-800 transition">
          <FaHome /> <span>Home</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-800 transition">
          <FaFileAlt /> <span>Articles</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-800 transition">
          <FaVideo /> <span>Videos</span>
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-slate-800 transition">
          <FaUser /> <span>Profile</span>
        </button>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/20 text-sm text-white/60">
        &copy; 2026 ContentHub
      </div>
    </div>
  );
};

export default Sidebar;
