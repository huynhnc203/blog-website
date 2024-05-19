import React from "react";
import {Image , Text} from '@chakra-ui/react'
import './CardComment.css'

const CardComment = ({key , comments}) => {
    return (
        <div className="container p-3">
            <div className="row">
                <div className="col-12">
                    <div className="card card-white post">
                        <div className="post-heading d-flex">
                            <div className="float-left image">
                            <Image
                                src="default.jpg"
                                className="rounded-circle me-2"
                                width= "40px"
                                height= "40px"
                                alt="avatar of user"
                                />
                            </div>
                            <div className="float-left meta">
                                <div className="title h5">
                                    <a href="#"><b>{comments.author.name}</b></a>
                                </div>
                                <h6 className="text-muted time">{comments.create_at}</h6>
                            </div>
                        </div>
                        <div className="post-description m-3"> 
                            <p>{comments.body}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComment;
