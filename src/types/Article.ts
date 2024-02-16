import { TUser } from "./User"

export type TArticle = {
    id: number | null,
    userId: number | null,
    title: string,
    author: TUser,
    description: string,
    body: string,
    slug: string,
    tagList: string[],
    isFav: boolean,
    favoritesCount: number,
    createdAt: Date | null,
    updatedAt: Date | null
}