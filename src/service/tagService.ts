import axios, { AxiosError } from "axios";
import { errorHandler } from "./handleError";
import { TTag } from "../types/Tag";

let instance = axios.create({
    baseURL: "/api/articles",
    headers: {Accept: "application/json"},
    timeout: 1000

})
export async function getTags(): Promise<string[]> {
    try {
        const { data } = await instance.get("/tags");
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function getTagsOf({ headers, slug }: { 
    headers: object | null, 
    slug: string
}) : Promise<string[]> {
    
    if (!headers) { headers = {} };
    try {
        const { data } : { data: TTag[] } = await instance.get("/tags/find", 
        { 
            headers: headers, 
            params: { slug: slug }
        })

        const tagList = data.map((tag) => { return tag.name });
        return tagList;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }

}