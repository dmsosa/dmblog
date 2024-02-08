import { TUser } from "./User"

export type TArticle = {
    id: number,
    title: string,
    author: TUser,
    description: string,
    body: string,
    slug: string,
    tags: string[],
    favorited: boolean,
    favoritesCount: number,
    createdAt: Date,
    updatedAt: Date
}