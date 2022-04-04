import { useState, useEffect } from "react";
import { ArticleThumbnailProps } from "../ArticleThumbnail/ArticleThumbnail.types";
import { Button } from "../Button";
import { Input } from "../Input";
import { RitchTextEditor } from "../RitchTextEditor";
type ArticleFormProps = {
  article?: ArticleThumbnailProps;
  // adicionamos uma propriedade de onSubmit, a ser disparada quando o usuário enviar o form.
  onSubmit?: (article: ArticleThumbnailProps) => void;
  onClick: () => Promise<void>;
}
export const ArticleForm: React.FC<ArticleFormProps> = ({
  article,
  onSubmit,
  onClick
}) => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [imagem, setImagem] = useState("");
  const [conteudo, setConteudo] = useState("");

  useEffect(() => {
    if (article) {
      setTitulo(article.titulo);
      setResumo(article.resumo);
      setImagem(article.imagem);
      setConteudo(article.conteudo || '');
    }
  }, [article]);

  // criamos um novo evento para este componente: sempre que o usuário 
  // fizer o submit do form, vamos enviar para o componente pai o artigo
  // que deve ser submetido.
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      const articleToSubmit = {
        ...article,
        titulo,
        resumo,
        imagem,
        conteudo,
      };
      onSubmit(articleToSubmit as ArticleThumbnailProps)
    }
  }

  const transformaImagemEmBase64 = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      setImagem(event.target.result);
    };
  };

 
  return (
    <div className="grid min-h-screen mx-10 ">
      <div>
        <h1 className="text-xl font-semibold">
          Hello there 👋,&nbsp;
          <span className="font-normal">please fill in your information to continue</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          {/* Adicionamos o estado e o evento de alteração em todos os campos. */}
          <Input
            placeholder="Digite aqui o título"
            type="text"
            name="titulo"
            label="Titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
          <Input
            placeholder="Breve rewsumo do artigo"
            type="textarea"
            name="resumo"
            label="Resumo"
            value={ resumo }
            onChange={(e) => setResumo(e.target.value)}
            required
          />

          <Input
            placeholder="Breve rewsumo do artigo"
            type="file"
            name="image"
            label="Banner"
            onChange={transformaImagemEmBase64}
            required={imagem===''}
          />

          <RitchTextEditor
            label="Conteúdo"
            name="conteudo"
            value={ conteudo }
            onChange={ setConteudo }
          />

          <Button type="submit">Salvar</Button>
          <button className="w-full mt-6 tracking-widest
        border-b-red-600 bg-red-500 py-3 text-white font-bold
        hover:bg-red-400 active:translate-y-[0.125rem] active:border-b-red-400" onClick={onClick} type="submit">Excluir</button>
        </form>
      </div>
    </div>
  );
};
