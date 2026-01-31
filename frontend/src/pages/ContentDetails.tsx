import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { getContentDetails } from "../api/content.api";
import type { Content } from "../types/content";

const ContentDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getContentDetails(parseInt(id))
      .then(setContent)
      .catch((err) => {
        console.error(err);
        alert(err.response?.data?.message || "Gagal mengambil konten.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Konten tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-950 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="h-14 bg-slate-950 shadow sticky top-0 z-20 flex items-center px-6 backdrop-blur-md border-b border-white/10">
          <Navbar />
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <h1 className="text-3xl font-bold mb-6">{content.title}</h1>

          {content.type === "article" && (
            <div
              className="prose prose-invert max-w-none bg-slate-900 p-6 rounded shadow-md "
              dangerouslySetInnerHTML={{
                __html: content.body || "Tidak ada isi artikel.",
              }}
            />
          )}

          {content.type === "video" && content.url && (
            <div className="mt-6 aspect-video w-full max-w-4xl rounded overflow-hidden shadow-lg">
              <iframe
                src={content.url}
                title={content.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {content.type === "video" && !content.url && (
            <div className="mt-6 text-center p-6 bg-slate-900 rounded shadow-md">
              Video belum tersedia.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ContentDetails;
