import { useEffect, useState } from "react";
import { TAuthContext, useAuth } from "../context/AuthContext";
import { TUser } from "../types/User";
import { getFollowersOf, getUserByUsername } from "../service/userService";
import { errorHandler } from "../service/handleError";

export function useUser({ username } : {
    username: string
}) {
    const [ author, setAuthor ] = useState<TUser>();
    const [ loading, setLoading ] = useState(false);
    const [ following, setFollowing ] = useState(false); 

    const { authState } = useAuth() as TAuthContext;
    const { headers, loggedUser } = authState;

    //get author by username, if user is logged, 
    // then we get the followers of the author,
    // and figure out if the logged user is one of them
    useEffect(() => {

        setLoading(true);

        getUserByUsername({ username })
        .then((author) => {
            if (headers) {
                getFollowersOf({ headers, userId: author.id})
                .then((followersList) => {
                    const isFollowing = followersList.filter((follower) => follower.id === loggedUser.id).length > 0;
                    setFollowing(isFollowing);
                })
                .catch((error) => errorHandler(error))
            }
            setAuthor(author)
        })
        .catch((error) => errorHandler(error))
        .finally(() => setLoading(false))
        
    }, [username, author, setAuthor])

    return { loading, author, following, setAuthor };
}