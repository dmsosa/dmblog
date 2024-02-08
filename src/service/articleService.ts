import axios, {  AxiosError } from 'axios';
import { errorHandler } from './handleError';
import { TArticle } from '../types/Article';

//Axios instance
let instance = axios.create(
    {
        baseURL: '/api/articles',
        timeout: 1000,
        headers: {"duvi":"duvivalue"}
    }
)
//Custom types

export type TArticleData = {
    articles: TArticle[],
    articlesCount: number
}
type TEndpoint = {
    [key: string]: string
}
//Get articles
export async function getArticles({ location, tags, limit=3, offset=0, username, headers } : 
    { location: string, tags: string[], limit?: number, offset?: number, username: string, headers: object }): Promise<TArticleData> {
    const endpoint: TEndpoint = {
        global: `?limit=${limit}&offset=${offset}`,
        favs: `?limit=${limit}&offset=${offset}&favorited=${username}`,
        feed: `/feed?limit=${limit}&offset=${offset}`,
        tags: `?limit=${limit}&offset=${offset}&tags=${tags}`,
        author: `?limit=${limit}&offset=${offset}&author=${username}`
    }    
    //All articles
    //Articles by author
    //Was ist feed?
    //Favs from user
    //Artikeln bei Tag

    try {
        const { data } =  await instance.get(endpoint[location], {headers: headers})
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
    
}


//toggleFavs
export async function toggleFavs({ headers, slug, favorited } : { headers: object, slug: string, favorited: boolean }) : Promise<void> {
    try {    
        
        const { data } = await instance.request({
                url: `/favs`,
                method: favorited? "DELETE":"POST",
                headers: headers,
                params: { slug: slug }
            })
        return data.article;
    } catch (error) {
        errorHandler(error as AxiosError)
        throw(error);
    } 
}