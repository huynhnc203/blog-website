import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Flex, Box, Heading, Text, Avatar, IconButton, Button } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike} from "react-icons/bi";
import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoadingPage from "../../LoadingPage/LoadingPage";

const CardBlog = ({key, load, name , date , title, subtitle , like, id , authorid}) => {
    const [isUserHover, setIsUserHover] = useState(false);
    const [likeCount, setLikeCount] = useState(like);
    const [liked, setLiked] = useState(false);
    const pictureLink = "picture" + id + ".png"

    const handleUserHover = () => {
        setIsUserHover(!isUserHover);
    };

    const handleLikeClick = () => {
        if (!liked) {
            setLikeCount(likeCount + 1);
            setLiked(true);
        } else {
            setLikeCount(likeCount - 1);
            setLiked(false);
        }
    };

    const setpostid = (id) => {
        localStorage.setItem('id', id)
    }

    const saveUserId = (userid) =>{
        localStorage.setItem('userId', userid)
    }

    return (
        <>
        <Card maxW='md' minH ='700px'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='author name' src='default.jpg' style={{ marginTop: '-20px' }} />

                        <Box>
                            <Heading
                                size='sm'
                                style={{ marginTop: '0px', marginBottom: '-6px' }}
                                onMouseEnter={handleUserHover}
                                onMouseLeave={handleUserHover}
                                cursor={"pointer"}
                                color={isUserHover ? "blue.500" : "black"}> <Link to ="/User" className='nav-link' onClick={() => saveUserId(authorid)} >{name} </Link></Heading>
                            <Text style={{ marginBottom: '20px' }}>{date}</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant='ghost'
                        colorScheme='gray'
                        aria-label='See menu'
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text
                    style={{ marginTop: '-60px', marginBottom: '40px', wordSpacing: '0.08px'}}
                    className="bold-text"
                    onMouseEnter={handleUserHover}
                    onMouseLeave={handleUserHover}
                    color={isUserHover ? "blue.500" : "black"}
                    fontSize='23px'
                    fontFamily='Oswald'
                    onClick={() => setpostid(id)}>
                     <Link to= '/SinglePage' className="nav-link">{title}</Link>    
                    
                </Text>
                <Text style={{ marginTop: '-40px', marginBottom: '0px' }}
                fontFamily='Lora'
                color='gray'>
                    {subtitle}
                </Text>
            </CardBody>
            <Image
                h='350px'
                objectFit='cover'
                src= {pictureLink}
                alt='IMAGE NOT FOUND'
            />

            <CardFooter
                display='flex'
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >   
                <Button flex='1' variant='ghost' onClick={() => setpostid(id)}>
                <Link to= '/SinglePage' className="nav-link">
                    Read now
                </Link>    
                </Button>
            </CardFooter>
        </Card>
        </>    
    )
}
export default CardBlog;