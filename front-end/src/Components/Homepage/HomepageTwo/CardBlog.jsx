import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Flex, Box, Heading, Text, Avatar, IconButton, Button } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { Image } from "@chakra-ui/react";

const CardBlog = () => {
    return (
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name='Hung' src='hunggay.jpg' />

                        <Box>
                            <Heading size='sm'>Hung Depzai</Heading>
                            <Text>hi ae</Text>
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
                <Text>
                    Tôi là một deverlopber chuyên nghiệp, tiếng anh thành thạo hi, hello, sở thích nghe nhạc dzz và ngồi hát.
                    Trang web đỉnh của chóp do Phúc đẹp trai vĩ đại xây dựng này thực sự ấn tượng đối với tôi.
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
                <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
                    Like
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
                    Comment
                </Button>
                <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
                    Share
                </Button>
            </CardFooter>
        </Card>
    )
}
export default CardBlog;