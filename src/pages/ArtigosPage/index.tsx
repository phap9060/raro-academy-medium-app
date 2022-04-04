import { useEffect, useState } from 'react';
import { ArticleList } from '../../components/ArticleList';
import { ArticleThumbnailProps } from '../../components/ArticleThumbnail/ArticleThumbnail.types';
import apiClient from '../../service/api-client';
export const ArtigosPage = () => {
    const [articles, setArticles] = useState<ArticleThumbnailProps[]>([]);

    useEffect(() => {

        async function buscarArtigo() {
            const response = await apiClient.get(`/artigos`)
            setArticles(response.data);
        }
        buscarArtigo()


    }, []);

    return (

        <div className="my-30">
            <ArticleList
                articles={articles}
            />
        </div>
    )
};