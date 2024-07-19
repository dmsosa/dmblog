import { TUser } from "./User"

export type TArticle = {
    id: number | null,
    title: string,
    author: TUser,
    description: string,
    body: string,
    slug: string,
    fontColor: string | null,
    backgroundColor: string | null,
    emoji: string | null,
    tagList: string[],
    isFav: boolean,
    favoritesCount: number,
    createdAt: Date | null,
    updatedAt: Date | null
}