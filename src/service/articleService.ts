import axios, {  AxiosError } from 'axios';
import {  errorHandler } from './handleError';
import { TArticle } from '../types/Article';
import { slugify } from '../helpers/helpers';
import { getTagsOf } from './tagService';


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
    {   location: string, 
        tagName?: string | null, 
        limit?: number, 
        offset?: number, 
        username?: string | null, 
        headers: object | null }): Promise<TArticleData> {
    
    
        const endpoint: TEndpoint = {
        global: `/global?limit=${limit}&offset=${offset}`,
        favs: `/favs/users/${username}?limit=${limit}&offset=${offset}&favorited=${username}`,
        feed: `/feed?limit=${limit}&offset=${offset}`,
        tags: `/tags?limit=${limit}&offset=${offset}&tag=${tagName}`,
        profile: `/author/${username}?limit=${limit}&offset=${offset}`,
        favList: `/favs/users/logged`
    }    
    try {
        if (!headers ) {
            headers = {};
        }
        const { data } =  await instance.get(endpoint[location], { headers: headers })
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
    
}


//toggleFavs
export async function toggleFavs({ headers, slug, isFav } : { 
    headers: object, 
    slug: string, 
    isFav: boolean }) : Promise<TArticle> {
    try {    
        
        const { data }: { data: TArticle }= await instance.request({
                url: `/favs/${slug}`,
                method: isFav? "DELETE":"POST",
                headers: headers
            })
        data.isFav = !isFav;
        return data;
    } catch (error) {
        errorHandler(error as AxiosError)
        throw(error);
    } 
}



//createArticle
export async function setArticle({userId, title, description, body, artSlug, backgroundColor, emoji, tagList, headers } : {
    userId: number | null,
    title: string,
    description: string,
    body: string,
    artSlug: string | null,
    backgroundColor: string | null,
    emoji: string | null,
    tagList: string[],
    headers: object | null
}) : Promise<TArticle> {

    try {
        const { data } = await instance.request({
            method: artSlug? "PUT":"POST",
            url: artSlug? `/slug/${artSlug}`:"/global",
            headers: headers || {},
            data:{ userId, title, description, body, slug: slugify(title), backgroundColor, emoji, tagList }
        })
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw (error);
    }
}

export async function uploadImageForArticle({ backgroundImage, title, headers } : { backgroundImage: File, title: string, headers: object | null }) : Promise<string> {
    try {
        const slug = slugify(title);
        const formData = new FormData();
        formData.append("file", backgroundImage);
        const {data} =  await instance.post(
            `/images/${slug}`, formData, { 
                headers: {...headers, "Content-Type": "multipart/form-data"}
            }
        )
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw (error);
    }
}

export async function getBackgroundImage({ slug } : { slug: string }) : Promise<string> {
    try {
        const {data} =  await instance.get(`/images/${slug}`, { timeout: 8000 });
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw (error);
    }
}

//Get article by slug
export async function getArticleBySlug({slug } : {slug: string }) : Promise<TArticle> {
    try {

        const { data } : { data:TArticle  } = await instance.get(`/slug/${slug}`);

        getTagsOf({slug})
        .then((tagList) => data.tagList = tagList)
        .catch((error) => console.log(error))
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function deleteArticleBySlug({slug, headers} : {slug: string, headers: object | null }) : Promise<String> {

    if (!headers) { 
        headers = {} 
    };
    try {    
        const { data } = await instance.request(
            {
                url: `/slug/${slug}`,
                method: "DELETE",
                headers: headers
            })
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error)
    }
}

export async function putBackgroundColor({slug, backgroundColor, headers} :  {slug: string, backgroundColor:string | null, headers: object | null }) : Promise<TArticle> {
    if (!headers) { headers = {}};
    try {
        const { data } = await instance.request(
            {
                url: `/color/${slug}`,
                method: 'POST',
                params: { property: 'backgroundColor', value: backgroundColor },
                headers: headers 
            }
        )
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}
export async function putFontColor({slug, fontColor, headers} :  {slug: string, fontColor:string | null, headers: object | null }) : Promise<TArticle> {
    if (!headers) { headers = {}};
    try {
        const { data } = await instance.request(
            {
                url: `/color/${slug}`,
                method: 'POST',
                params: { property: 'fontColor', value: fontColor },
                headers: headers 
            }
        )
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function putEmoji({slug, emoji, headers} :  {slug: string, emoji:string, headers: object | null }) : Promise<TArticle> {
    if (!headers) { headers = {}};
    try {
        const { data } = await instance.request(
            {
                url: `/emoji/${slug}`,
                method: 'POST',
                params: { 'emoji': emoji },
                headers: headers 
            }
        )
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}