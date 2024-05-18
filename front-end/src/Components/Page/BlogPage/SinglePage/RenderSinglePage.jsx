import React, { useContext , useEffect } from 'react';
import IdContext from './SinglePageContext';
import { useState } from 'react';
import './RenderSinglePage.css';
import PostHeader from './PostHeader';
import { HStack, Flex, Text } from '@chakra-ui/react';
import { BsHeart, BsHeartFill} from 'react-icons/bs';
import { CiShare1 } from "react-icons/ci";
import RenderComment from './Comment/RenderComment';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import {Link} from 'react-router-dom';  
import LoadingPage from '../../../LoadingPage/LoadingPage';
import he from 'he';
import { URL_LINK } from '../../../Config';

const RenderSinglePage = () => {
    const [dataPost, setDataPost] = useState({});
    const [authorData, setAuthorData] = useState({})
    const [tym , setTym] = useState(false);
    const [Loading, setLoading] = useState(false);
    const id = localStorage.getItem('id')
    var linkPost = URL_LINK + "/api/posts/" + id 

    const makeRequestGetPostId = async () => {
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(linkPost, options);
          const result = await response.json();
          setDataPost(result['data'])
          setAuthorData(result['data']['author'])
          setTimeout(()=> setLoading(true), 3000)
        }

    const scrollComment= () => {
        window.scrollBy({
            top:200,
            behavior: "smooth"  
        })
    }    

    // ham set user id vao local
    const saveUserId = (userid) =>{
        localStorage.setItem('userId', userid)
    }

    useEffect(() => {
        makeRequestGetPostId();
    },[])
        
        
    return (
        <>
        {Loading ?
        <div className='renderpost'>
            <div className='box-1'>
                <PostHeader name = {authorData.name} created_at = {authorData['created_at']}/>
                <div className='tieude'>
                    <Text fontFamily='Oswald' fontSize='50px' fontWeight={700} textAlign={'center'} color='black' >{dataPost.title}</Text>
                </div>
                <div className='tieudephu'>
                    <h2>{dataPost.subtitle}</h2>
                </div>
                <div className='m-5' dangerouslySetInnerHTML={{ __html: dataPost.body && he.decode(dataPost.body) }}></div>
            <HStack borderTop={'1px'} color="black">
                <Flex
                    p={4}
                    alignItems="center"
                    justifyContent={'space-between'}
                    roundedBottom={'lg'}
                    cursor={'pointer'}
                    w="full"
                    onClick={scrollComment}>
                    <Text fontSize={'md'} fontWeight={'semibold'}>
                        Comment
                    </Text>
                    <CiShare1 size = '24px' />
                </Flex>
                <Flex
                    type = "button"
                    p={4}
                    alignItems="center"
                    justifyContent={'space-between'}
                    roundedBottom={'sm'}
                    borderLeft={'1px'}
                    cursor="pointer"
                    onClick={() => setTym(true)}>
                    {tym? (
                    <>
                        <Text>  </Text>
                    <BsHeartFill fill="red" fontSize={'24px'} />
                    </>
                    ) : (
                    <BsHeart fontSize={'24px'} />
                    )}
                </Flex>
        </HStack>
        
            <div className='post__comments'>
                    <RenderComment comments = {dataPost.comments}/>
            </div>

            </div> {/* end box-1 */}


            {/* box-2 
            <div className='box-2'>
                <div className="container mt-4 d-flex justify-content-center " style={{height: '800px'}}>
                <div className="card p-4" style = {{width: '400px'}}>
                <div className="image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary">
                    <img src={authorData.profile_pic} height="100" width="100" alt="profile avatar" />
                </button>
                <span className="name mt-3"><Link to ="/User" className='nav-link' onClick={() => saveUserId(authorData.id)} ><Text>{authorData.name}</Text></Link></span>
                <span className="idd">@iduser {authorData.id}</span>
                <span className='buttonFollow mt-3 '><button type="button" class="btn btn-dark rounded-4">Follow</button></span>
                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    <span className="number p-3"> {authorData.followers} <span className="follow">Followers</span></span>
                    <span className="number">{authorData.followings} <span className="follow">Followers</span></span>
                </div>
                <div className="text mt-3">
                    <span>{authorData.description}</span>
                </div>
                <div className="gap-3 mt-4 icons d-flex flex-row justify-content-center align-items-center">
                    <span> <Link> <FaFacebookSquare size = '24px' /></Link> </span>
                    <span> <Link> <FaGithubSquare size = '24px'/> </Link></span>
                    <span>  <Link> <FaLinkedin size = '24px' /> </Link></span>
                </div>
                <div className="px-2 rounded mt-4 date">
                    <span className="join">Joined {authorData.created_at}</span>
                </div>
                </div>
            </div>
            </div>
                    </div>{/* end box-2 */} 
        </div> : <LoadingPage />}
        </>    
    )
}

export default RenderSinglePage