import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Flex, Box, Heading, Text, Avatar, IconButton, Button } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { Image } from "@chakra-ui/react";

const CardBlog = ({key, load, name , date , title, subtitle , like}) => {
    const [isUserHover, setIsUserHover] = useState(false);
    const [likeCount, setLikeCount] = useState(like);
    const [liked, setLiked] = useState(false);

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
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Hung' src='default.jpg' style={{ marginTop: '-20px' }} />

                        <Box>
                            <Heading
                                size='sm'
                                style={{ marginTop: '0px', marginBottom: '-6px' }}
                                onMouseEnter={handleUserHover}
                                onMouseLeave={handleUserHover}
                                cursor={"pointer"}
                                color={isUserHover ? "blue.500" : "black"}>{name}</Heading>
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
                    style={{ marginTop: '-60px', marginBottom: '40px' }}
                    className="bold-text"
                    color='Black'
                    fontSize='20px'>
                    {title}
                </Text>
                <Text style={{ marginTop: '-40px', marginBottom: '0px' }}>
                    Tôi là một developer chuyên nghiệp, tiếng anh thành thạo hi, hello, sở thích nghe nhạc vàng và ngồi hát.
                    Trang web đỉnh của chóp do Phúc và tôi - đẹp trai vĩ đại xây dựng này thực sự rất tốt rất tốt.
                    Một trang web mang đầy đủ tinh hoa của một svip.
                </Text>
            </CardBody>
            <Image
                objectFit='cover'
                src='technology.png'
                alt='Chakra UI'
            />

            <CardFooter
                justify='space-between'
                flexWrap='wrap'
                sx={{
                    '& > button': {
                        minW: '136px',
                    },
                }}
            >
                <Button
                    className={`like-button`}
                    style={{ color: liked ? 'blue' : 'black' }}
                    variant='ghost'
                    leftIcon={<BiLike />}
                    onClick={handleLikeClick}
                    size="md"
                >
                    Like ({likeCount})
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                </Button>
            </CardFooter>
        </Card>
    )
}
export default CardBlog;