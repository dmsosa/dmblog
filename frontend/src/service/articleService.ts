import axios, { AxiosError } from "axios";
import { createApiError } from "./errorHandler";
import { TArticle } from "../types/Article";
import { slugify } from "../helpers/helpers";
import { getTagsOf } from "./tagService";

//Axios instance
const instance = axios.create({
  baseURL: "/api/articles",
  timeout: 1000,
  headers: { duvi: "duvivalue" },
});
//Custom types

export type TArticleData = {
  articles: TArticle[];
  articlesCount: number;
};
type TEndpoint = {
  [key: string]: string;
};


//OFFNETE ENDPUNKTE


//Get articles
export async function getArticles({
  location,
  tags,
  limit = 3,
  offset = 0,
  searchString,
  username,
}: {
  location: string;
  tags: string[];
  limit?: number;
  offset?: number;
  searchString?: string | null;
  username?: string | null;
}): Promise<TArticleData> {
  let tagList = '';
  for ( let i = 0 ; i < tags.length ; i++ ) {
    if (i === 0) {
      tagList = tags[i];
    } else {
      tagList = "," + tags[i];
    }
  }
  const endpoint: TEndpoint = {
    global: `/global?limit=${limit}&offset=${offset}` + `${tags.length > 0 ? `tags=${tagList}` : ''}`,
    search: `/search/${searchString}?limit=${limit}&offset=${offset}`,
    favs: `/favs?username=${username}&limit=${limit}&offset=${offset}` + `${tags.length > 0 ? `tags=${tagList}` : ''}`,
    author: `/author?username=${username}&limit=${limit}&offset=${offset}` + `${tags.length > 0 ? `tags=${tagList}` : ''}`,
  };
  try {
    const { data } = await instance.get(endpoint[location]);

    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//Get article by slug
export async function getArticle({
  slug,
}: {
  slug: string;
}): Promise<TArticle> {
  try {
    const { data }: { data: TArticle } = await instance.request({ method: "GET", params: { "slug": slug }});

    getTagsOf({ slug })
      .then((tagList) => (data.tagList = tagList))
      .catch((error) => console.log(error));
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//GESCHLOSSENE ENDPUNKTE

//toggleFavs
export async function toggleFavs({
  headers,
  slug,
  isFav,
}: {
  headers: object;
  slug: string;
  isFav: boolean;
}): Promise<TArticle> {
  try {
    const { data }: { data: TArticle } = await instance.request({
      url: `/favs/${slug}`,
      method: isFav ? "DELETE" : "POST",
      headers: headers,
    });
    data.isFav = !isFav;
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

//createArticle
export async function putArticle({
  formData,
  artSlug,
  headers,
}: {
  formData: FormData;
  artSlug: string | null;
  headers: object;
}): Promise<TArticle> {
  try {

    let title = formData.get("title") as string || "";

    const { data } = await instance.request({
      method: artSlug ? "PUT" : "POST",
      params: artSlug ? { "slug": artSlug } : { "slug": slugify(title) },
      headers: {...headers, 'Content-Type': 'multipart/form-data'},
      data: formData,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}


export async function deleteArticle({
  slug,
  headers,
}: {
  slug: string;
  headers: object;
}): Promise<string> {
  try {
    const { data } = await instance.request({
      params: { "slug": slug },
      method: "DELETE",
      headers: headers,
    });
    return data;

  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

export async function putBackgroundColor({
  slug,
  backgroundColor,
  headers,
}: {
  slug: string;
  backgroundColor: string | null;
  headers: object;
}): Promise<TArticle> {

  try {
    const { data } = await instance.request({
      url: `/color/${slug}`,
      method: "POST",
      params: { property: "backgroundColor", value: backgroundColor },
      headers: headers,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}
export async function putFontColor({
  slug,
  fontColor,
  headers,
}: {
  slug: string;
  fontColor: string | null;
  headers: object;
}): Promise<TArticle> {
  try {
    const { data } = await instance.request({
      url: `/color/${slug}`,
      method: "POST",
      params: { property: "fontColor", value: fontColor },
      headers: headers,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}

export async function putEmoji({
  slug,
  emoji,
  headers,
}: {
  slug: string;
  emoji: string;
  headers: object;
}): Promise<TArticle> {
  try {
    const { data } = await instance.request({
      url: `/emoji/${slug}`,
      method: "POST",
      params: { emoji: emoji },
      headers: headers,
    });
    return data;
  } catch (error) {
    const apiError = createApiError(error as AxiosError);
    throw apiError;
  }
}
