import { ReactNode, ReactNodeArray } from "react";

function Blog({tags, title, link, date} : {tags: ReactNode, title: string, link: string, date: string}) {
    return (
        <div className="row blog-row">
            <div className="col blog-col blog-bullet-point"><h2>&#x2022;</h2></div>
            <div className="col blog-col blog-tags">{tags}</div>
            <div className="col blog-col blog-title"><a className="blog-link" href={link}>{title}</a></div>
            <div className="col blog-col blog-date"><h5>{date}</h5></div>
        </div>   
    )
}    
export default Blog;