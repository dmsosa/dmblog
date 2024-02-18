import axios, {  AxiosError } from 'axios';
import { errorHandler } from './handleError';
import { TArticle } from '../types/Article';
import { slufigy } from '../helpers/helpers';
import { getUser, getUserById, getUserByUsername } from './userService';
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
export async function setArticle({title, description, body, artSlug, tagList, headers } : {
    title: string,
    description: string,
    body: string,
    artSlug: string | null,
    tagList: string[],
    headers: object | null
}) : Promise<TArticle> {

    try {
        const { data } = await instance.request({
            method: artSlug? "PUT":"POST",
            url: artSlug? `/${artSlug}`:"/global",
            headers: headers || {},
            data: artSlug? { title, description, body, slug: artSlug, tagList } : 
            { title, description, body, slug: slufigy(title), tagList }
        })
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw (error)
    }

}

//Get article by slug
export async function getArticleBySlug({slug, headers } : {slug: string, headers: object | null}) {
    try {
        if (!headers) { headers = {} };
        const { data } : { data:TArticle } = await instance.get(`/${slug}`, { headers: headers});

        getUserById({ headers, userId: data.userId  })
        .then((user) => { 
            data.author = user})
        .catch((error) => console.log(error))

        getTagsOf({headers, slug})
        .then((tagList) => data.tagList = tagList)
        .catch((error) => console.log(error))

        //setFav is default setted to false
        data.isFav = false;

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
                url: `/${slug}`,
                method: "DELETE",
                headers: headers
            })
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }


}