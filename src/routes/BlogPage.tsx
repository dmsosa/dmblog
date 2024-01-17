import { Link } from "react-router-dom";
import Blog from "../components/Blog";

export function BlogPage() {
    return (
        <>
        <h1>Blog</h1>
        <hr className="blog-divisor"></hr>
        <div className="blog-container">
            <Blog link="#" title="Wie kann man Programmieren lernen" date="23/03/2023" tags={<Link to="#"/>}
            />
        </div>
        </>
    )
}