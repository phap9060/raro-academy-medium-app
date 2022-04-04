import './style.css'
export const NoArticle = () => {
    return (
        <div className="no-articles">
        <h1 className='titulo'>Sem Artigos!</h1>
        <p className='texto'>
            Você não tem nenhum arquivo criado, direcione-se para a Home para ver a postage de artigos de outras pessoas <br/>
            ou crie artigos na aba "Novo Artigo"
        </p>
        </div>
    );
}