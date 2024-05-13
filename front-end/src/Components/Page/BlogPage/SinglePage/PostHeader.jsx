import React from 'react';
import './PostHeader.css';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { Image } from '@chakra-ui/react';

export function PostHeader({name , created_at}) {
  return (
            <div className="postheader">
                <div className="postheader_body">
                        <div className="postname">
                            <div>
                         <Image
                            borderRadius='full'
                            boxSize='50px'
                            src='default.jpg'
                            alt='Dan Abramov'
                            />
                            </div>
                            <div>
                            <h4><b>{name}</b></h4>
                            </div>
                        </div>
                            <h6 className="card-subtitle mb-2 text-muted">
                                <p className="card-text text-muted small ">
                                    <FaStar size= '25px'/> 
                                    <span className="vl mr-2 ml-0"></span>
                                    Created by <span className="font-weight-bold">{name}</span> {created_at}
                                </p>
                            </h6>
                </div>
            </div>
  );
}

export default PostHeader;