import React, {useContext, useState} from "react";
import CardComment from "./CardComment";
import FormCardComment from "./FormCardComment";
import IdContext from "../SinglePageContext";

const RenderCommnet = ({comments}) => {
    const [addpost, setAddPost] = useState(5)

    const showMoreComments = ()=> {
        setAddPost(addpost => addpost + 5)
    }

    return (
        <>
        <FormCardComment/>
        {comments && comments.length > 0 ? (
                comments.slice(0, addpost).map((comments, index) => (
                    <CardComment key={index} comments={comments} />
                ))
            ) : (
                <p>No comments available</p>
            )}

            {comments && addpost < comments.length}{
                <button type="button" class="btn btn-info m-3 rounded-3" onClick={showMoreComments}>More</button>
            }
        </>
    )
}
export default RenderCommnet;