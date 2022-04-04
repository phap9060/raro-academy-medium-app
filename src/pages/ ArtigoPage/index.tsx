import { useState, useEffect } from "react";
import { ArticleView } from "../../components/ArticleView";
import apiClient from '../../service/api-client'
import { useParams} from "react-router-dom";
type ArticleProps = {
  imagem?: string;
  titulo?: string;
  resumo?: string;
  dataPublicacao?: Date;
  tempoLeitura?: string;
  autor: {
    nome: string;
    avatar: string;
    id:number
  };
  editavel?: boolean;
  id?:number;
  conteudo: string;

}
export const ArtigoPage = () => {
  const [artigo, setArtigo] = useState<ArticleProps>();
  const {id} = useParams()
  

  const [dataPublicacao] = useState(new Date());

  useEffect(() => {
    async function buscarArtigo() {
      const response = await apiClient.get(`/artigos/${id}`)
      setArtigo(response.data);
    }
    buscarArtigo()
    
  },[])
  
 
  return (
    
    <div className="m-10">
      <ArticleView
        article={artigo?.conteudo}
        autor={artigo?.autor}
        dataPublicacao={dataPublicacao}
        tempoLeitura={ '10min' }
      />
    </div>
   

  );
};