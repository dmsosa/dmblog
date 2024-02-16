export type TUser = {
    id: number | null,
    username: string,
    email: string,
    password: string,
    image: string | null,
    bio: string | null,
    followersCount: number | null, 
    followingCount: number | null,
    followers: TUser[],
    following: TUser[],
    createdAt: Date | null,
    updatedAt: Date | null
}