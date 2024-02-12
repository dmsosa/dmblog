import axios, {  AxiosError } from 'axios';
import { errorHandler } from './handleError';
import { TArticle } from '../types/Article';
import { TUser } from '../types/User';
import {  TAuthState } from '../context/AuthContext';

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
export async function getArticles({ location, tagName, limit=3, offset=0, username, headers } : 
    { location: string, tagName: string, limit?: number, offset?: number, username?: string | null, headers: object | null }): Promise<TArticleData> {
    
    
        const endpoint: TEndpoint = {
        global: `/?limit=${limit}&offset=${offset}`,
        favs: `/?limit=${limit}&offset=${offset}&favorited=${username}`,
        feed: `/feed?limit=${limit}&offset=${offset}`,
        tags: `?limit=${limit}&offset=${offset}&tags=${tagName}`,
        author: `?limit=${limit}&offset=${offset}&author=${username}`
    }    
    //All articles
    //Articles by author
    //Was ist feed?
    //Favs from user
    //Artikeln bei Tag

    try {
        if (!headers ) {
            headers = {};
        }
        const { data } =  await instance.get(`/global?limit=${limit}&&offset=${offset}`, {headers: headers})
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
    
}


//toggleFavs
export async function toggleFavs({ headers, username, slug, isFav } : { 
    headers: object, 
    username: string, 
    slug: string, 
    isFav: boolean }) : Promise<TArticle> {
    try {    
        
        const { data }: { data: TArticle }= await instance.request({
                url: `/favs`,
                method: isFav? "DELETE":"POST",
                headers: headers,
                params: { 
                    slug: slug,
                    username: username
                        }
            })
        data.isFav = !isFav;
        return data;
    } catch (error) {
        errorHandler(error as AxiosError)
        throw(error);
    } 
}

//getFavState 
export async function getFavsOfUser({headers, username} : {
    headers: object,
    username: string 
}) : Promise< TArticleData> {
    try {
        console.log(headers);
        const { data } = await instance.request({
        method: "GET",
        url: `/favs/${username}`,
        headers: headers
        })
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw (error);
    }
}