import { useEffect, useState } from "react";
import { ArticleList } from "../../components/ArticleList";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import { NoArticle } from "../../components/NoArticles";
import apiClient from "../../service/api-client";
import { useNavigate,useParams } from "react-router-dom";
export const MeusArtigosPage = () => {
  const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);
  const [deletado,setDeletado]= useState(false)
  const navigate = useNavigate();
  async function buscaMeusArtigos() {
    const response = await apiClient.get<ArticleThumbnailProps[]>(
      '/artigos/meus-artigos')
      setArticles(response.data);
  }
  useEffect(() => {
    buscaMeusArtigos();
  }, [deletado]);
  const remove = async (id:number) => {
    console.log('alemao')
    await apiClient.delete<ArticleThumbnailProps>(`/artigos/${id}`);
    setDeletado(()=>!deletado)
    navigate('/artigos');
  }
  


  if (articles.length === 0) {
    return <NoArticle />
  }
  return (
    <div className="my-30">
      <ArticleList articles={articles} remove={remove}  />
    </div>
  );
};