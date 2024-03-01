import { TUser } from "./User"

export type TComment = {
    articleId: number, 
    userId: number,
    author: TUser | null,
    id: number,
    body: string,
    postedAt: Date,
    updatedAt: Date
}