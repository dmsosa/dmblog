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
        const { data } = await instance.get("/global/tags");
        return data;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}

export async function getTagsOf({ slug }: {  
    slug: string
}) : Promise<string[]> {
    
    try {
        const { data } : { data: TTag[] } = await instance.get(`/tags/${slug}`)

        const tagList = data.map((tag) => { return tag.name });
        return tagList;
    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }

}