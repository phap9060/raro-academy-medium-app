import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import axios from "axios";
export const MeusArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);
  async function buscaMeusArtigos() {
    const token = localStorage.getItem("access_token");
    const response = await axios.get<ArticleThumbnailProps[]>(
      'http://3.221.159.196:3307/artigos/meus-artigos',
      {
        headers: {
          'Authorization': `bearer ${token}`
        }
      }
    );
    console.log(response.data);
    setArticles(response.data);
  }

  useEffect(() => {
    buscaMeusArtigos();
  }, []);

  return (
    <div className="my-30">
      <ArticleList articles={articles} />
    </div>
  );
};