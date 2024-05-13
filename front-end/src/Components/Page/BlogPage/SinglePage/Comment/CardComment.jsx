import React from "react";
import {Image , Text} from '@chakra-ui/react'
import './CardComment.css'

const CardComment = () => {
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
                                    <a href="#"><b>Ryan Haywood</b></a>
                                </div>
                                <h6 className="text-muted time">1 minute ago</h6>
                            </div>
                        </div>
                        <div className="post-description"> 
                            <p>Bootdey is a gallery of free snippets resources templates and utilities for bootstrap css hmtl js framework. Codes for developers and web designers</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardComment;
