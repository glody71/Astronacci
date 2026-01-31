import type { Content } from "../types/content";
import Card from "./Card";

interface Props {
  contents: Content[];
  loading: boolean;
}

const MainContent = ({ contents=[], loading }: Props) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  const articles = contents.filter(item => item.type === "article");
  const videos = contents.filter(item => item.type === "video");

  return (
    <div className="space-y-8">
      
      <section>
        <h2 className="text-xl font-semibold mb-4">Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {articles.map((item) => (
            <Card key={item.id} content={item} />
          ))}
        </div>
      </section>

      
      <section>
        <h2 className="text-xl font-semibold mb-4">Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map(item => (
            <Card key={item.id} content={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainContent;
