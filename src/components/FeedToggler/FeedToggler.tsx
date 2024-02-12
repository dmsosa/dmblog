import { TAuthContext, useAuth } from "../../context/AuthContext";
import { TFeedContext, useFeed } from "../../context/FeedContext";
import FeedNavLink from "./FeedNavLink";

function FeedToggler() {

    const { tabName, tagName } = useFeed() as TFeedContext;
    const { authState } = useAuth() as TAuthContext;
    const { isAuth } = authState;

    return (
        <ul className="feed-toggler">
            {isAuth && <FeedNavLink name="feed" text="Your feed" />}

            <FeedNavLink name="global" text="Global feed" />

            { tabName==="tag" && <FeedNavLink name="tag" text={tagName}/>}
        </ul>
    )
}

export default FeedToggler;