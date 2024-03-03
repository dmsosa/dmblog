export type TUser = {
    id: number | null,
    username: string,
    email: string,
    password: string,
    image: string,
    bio: string,
    followersCount: number | null, 
    followingCount: number | null,
    followers: TUser[] | null,
    following: TUser[] | null,
    createdAt: Date | null,
    updatedAt: Date | null,
    isFollowing: boolean
}