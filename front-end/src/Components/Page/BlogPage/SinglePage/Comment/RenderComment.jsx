import React, {useContext, useState, useEffect} from "react";
import CardComment from "./CardComment";
import FormCardComment from "./FormCardComment";
import IdContext from "../SinglePageContext";

const RenderCommnet = ({comments: initialComments}) => {
    const [addpost, setAddPost] = useState(5);
    const [comments, setComments] = useState(initialComments);

    const showMoreComments = ()=> {
        setAddPost(addpost => addpost + 5);
    }

    useEffect(() => {
        setComments(initialComments);
    }, [initialComments]);

    return (
        <>
        <FormCardComment onNewComment={(newComment) => {setComments([...comments, newComment])}} />
        {comments && comments.length > 0 ? (
                comments.slice(0, addpost).map((comment, index) => (
                    <CardComment key={index} comments={comment} />
                ))
            ) : (
                <p>No comments available</p>
            )}

            {comments && addpost < comments.length && 
                <button type="button" class="btn btn-info m-3 rounded-3" onClick={showMoreComments}>More</button>
            }
        </>
    )
}
export default RenderCommnet;