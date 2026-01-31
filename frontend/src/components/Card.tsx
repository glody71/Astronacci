import { getContentDetails } from "../api/content.api";
import type { Content } from "../types/content";
import { useNavigate } from "react-router-dom";

interface Props {
  content: Content;
}

const Card = ({ content }: Props) => {
  const navigate = useNavigate();

  const handleCardClick = async (id: number) => {
    try {
      await getContentDetails(id);
      navigate(`/contents/${id}`);
    } catch (error: any) {
      console.log(error.response); 
      if (error.response?.status === 403) {
        alert(
          "Limit konten sudah terpakai. Upgrade membership untuk akses lebih.",
        );
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div
      onClick={() => handleCardClick(content.id)}
      className="bg-slate-800 p-4 rounded hover:scale-105 hover:shadow-lg transition-transform cursor-pointer"
    >
      <img
        src={content.thumbnail_url}
        alt={content.title}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="font-semibold text-white">{content.title}</h3>
    </div>
  );
};

export default Card;
