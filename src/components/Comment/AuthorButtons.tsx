import {  MouseEvent } from "react";

function AuthorButtons({id} : {
    id: number 
} ) {
    const handleEdit = (id: number) => {

    }
    const handleDelete = (id: number) => {

    }
    return (
        <div className="comment-dropdown">
            <button className="comment-dropbtn"></button>
            <div className="comment-dropcontent">
                <ul>
                    <li><a role="button" onClick={handleEdit}>Edit</a></li>
                    <li><a role="button" onClick={handleDelete}>Delete</a></li>
                    <li><a role="button">Hide</a></li>
                </ul>
            </div>
        </div>
    )

}

export default AuthorButtons;