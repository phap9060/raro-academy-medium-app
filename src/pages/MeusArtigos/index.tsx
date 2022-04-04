import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import axios from "axios";
import { NoArticle } from "../../components/NoArticles";
export const MeusArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);
  const [render, setRender] = useState(false)
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
    setArticles(response.data);
  }
  useEffect(() => {
    buscaMeusArtigos();
  }, []);


  if (articles.length === 0) {
    return <NoArticle />
  }
  return (
    <div className="my-30">
      <ArticleList articles={articles} />
    </div>
  );
};