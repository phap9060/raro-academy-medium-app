import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { ArticleForm } from "../../components/ArticleForm";
import { ArticleThumbnailProps } from "../../components/ArticleThumbnail/ArticleThumbnail.types";
import apiClient from '../../service/api-client'

export const EditarArquivoPage = () => {
  const [ artigo, setArtigo ] = useState<ArticleThumbnailProps>();
  const { id } = useParams();

  const navigate = useNavigate()

  async function buscarArtigo() {
    const response = await apiClient.get(`/artigos/${id}`,)
    setArtigo(response.data);
  }
  useEffect(() => {
    if (id) {
      buscarArtigo();
    }
  }, [id]);
  async function handleSubmit(artigo: ArticleThumbnailProps) {
    if (artigo.id) {
        const editArtigo = await apiClient.patch(`/artigos/${artigo.id}`, { ...artigo });
        navigate(`/artigo/${editArtigo.data.id}`);
    } else {
        const salvarArtigo = await apiClient.post(`/artigos/`, { ...artigo });
        navigate(`/artigo/${salvarArtigo.data.id}`);
    }
  }


  return (
    <>
    <div className="items-center justify-center m-10">
      <ArticleForm article={artigo} onSubmit={handleSubmit} />
    </div>
  </>
  );
}