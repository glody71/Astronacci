import { useEffect, useState } from "react";
import MainContent from "../components/MainContent";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { getContent } from "../api/content.api";
import type { Content } from "../types/content";
import { BiMenu } from "react-icons/bi";

const ContentList = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchContents = async (query: string = "") => {
    setLoading(true);
    try {
      const data = await getContent(query);
      setContents(data);
      console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContents(search);
  }, [search]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar for desktop */}
      <aside className="hidden md:flex w-64 bg-slate-950 fixed inset-y-0 left-0 z-20">
        <Sidebar />
      </aside>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 transform md:hidden transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="h-14 bg-slate-950 shadow sticky top-0 z-20 flex items-center px-4 md:px-6 backdrop-blur-md border-b border-white/10">
          {/* Hamburger for mobile */}
          <button
            className="mr-4 md:hidden text-white text-2xl"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <BiMenu />
          </button>

          <Navbar search={search} setSearch={setSearch} />
        </header>

        <main className="flex-1 overflow-auto p-3">
          <MainContent contents={contents} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default ContentList;
