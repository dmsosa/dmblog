import axios, { AxiosError } from "axios"
import { TComment } from "../types/Comment"
import { errorHandler } from "./handleError";

export type TCommentData = {
    comments: TComment[],
    commentsCount: number
}


let instance = axios.create({
    baseURL:"/api/articles/comments",
    timeout: 1000
});
export async function getCommentsOfArticle({ slug } : {
    slug: string
}) : Promise<TCommentData> {

    try {
        const { data }: { data: TCommentData } = await instance.get("", { params: { slug: slug }});
        data.comments = data.comments.map((comment) => { comment.author = null; return comment });
        return data;

    } catch (error) {
        errorHandler(error as AxiosError);
        throw(error);
    }
}