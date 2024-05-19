import React, { useContext , useEffect } from 'react';
import IdContext from './SinglePageContext';
import { useState } from 'react';
import './RenderSinglePage.css';
import PostHeader from './PostHeader';
import { HStack, Flex, Text, Box , keyframes } from '@chakra-ui/react';
import { motion, isValidMotionProp } from 'framer-motion'

import { BsHeart, BsHeartFill} from 'react-icons/bs';
import { CiShare1 } from "react-icons/ci";
import RenderComment from './Comment/RenderComment';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { FcFinePrint } from "react-icons/fc";
import {Link} from 'react-router-dom';  
import LoadingPage from '../../../LoadingPage/LoadingPage';
import he from 'he';
import { URL_LINK } from '../../../Config';

const RenderSinglePage = () => {
    const [dataPost, setDataPost] = useState({});
    const [authorData, setAuthorData] = useState({})
    const [tym , setTym] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [useGPT , setUseGPT] = useState(false)
    const [textGPT, setTextGPT] = useState('')
    const [loadingText , setLoadingText] = useState(false)
    const id = localStorage.getItem('id')
    const linkPost = URL_LINK + "/api/posts/" + id 
    const url_gpt = URL_LINK + "/api/posts/conclusion/" + id

    const animationKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`

    const animation = `${animationKeyframes} 2s ease-in-out infinite`;

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
          console.log(1)
          setTimeout(()=> setLoading(true), 3000)
    }

    const makeGPTRequest = async () => {
        const response = await fetch(url_gpt);
        const result = await response.json();  
        setTextGPT(result['data']['conclusion']);
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

    const handleAnimationGPT = () => {
        setUseGPT(true)
        setTimeout(() => setLoadingText(true), 5000)
    }

    useEffect(() => {
        makeRequestGetPostId();
        makeGPTRequest();
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
                    <Text fontWeight={700}> Use GPT <FcFinePrint onClick={() => handleAnimationGPT()} size = '35px' /></Text>
                    
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


           {useGPT && (
            <div className='box-2'>
                <div className='Gpt-header'>
                    <Text fontFamily='Oswald' fontSize='50px' fontWeight={700} textAlign={'center'} color='black'> GPT SUMARRY </Text>
                </div>
                {loadingText ? <Text className='m-3' fontFamily='Lora' fontSize = '20px' fontWeight={600} >{textGPT}</Text> : 
                <Flex className='mt-5' justifyContent="center" alignItems="center">
                <Box as={motion.div}
                    animation={animation}
                    height='40px'
                    width='40px'
                    bg='blue.400'
                    drag='x'
                    dragConstraints={{ left: -100, right: 100 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition='0.5s linear'>
                </Box>
                </Flex>}
                
            </div>)}

        </div> : <LoadingPage />}
        </>    
    )
}

export default RenderSinglePage