import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Flex, Box, Heading, Text, Avatar, IconButton, Button } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { Image } from "@chakra-ui/react";
import "./TrendingPost.css";

const TrendingPost = () => {
    const [isTitleHover, setIsTitleHover] = useState(false);
    const [isUserHover, setIsUserHover] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    const handleTitleHover = () => {
        setIsTitleHover(!isTitleHover);
    };

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
        <Card maxW="md">
            <CardHeader>
                <Flex justifyContent="space-between" alignItems="center">
                    <Flex alignItems="center" gap="4">
                        <Avatar name="Hung" src="hunggay.jpg" style={{ marginTop: "-8px" }} />
                        <Box>
                            <Heading
                                onMouseEnter={handleUserHover}
                                onMouseLeave={handleUserHover}
                                cursor={"pointer"} size="sm"
                                style={{ marginBottom: "4px" }}
                                color={isUserHover ? "blue.500" : "black"} >Hung Depzai</Heading>
                            <Text style={{ marginTop: "-4px" }}>Đệ nhất vjppro</Text>
                        </Box>
                    </Flex>
                    <IconButton
                        variant="ghost"
                        colorScheme="gray"
                        aria-label="See menu"
                        icon={<BsThreeDotsVertical />}
                    />
                </Flex>
            </CardHeader>
            <CardBody>
                <Text
                    className="bold-text"
                    onMouseEnter={handleTitleHover}
                    onMouseLeave={handleTitleHover}
                    cursor="pointer"
                    color={isTitleHover ? "blue.500" : "black"}
                >
                    Artificial Intelligence: The Future of Healthcare
                </Text>
            </CardBody>
            <CardFooter justifyContent="space-between" flexWrap="wrap">
                <Button
                    className={`like-button ${liked ? "liked" : ""}`}
                    leftIcon={<BiLike />}
                    onClick={handleLikeClick}
                    size="md"
                >
                    {liked ? "Unlike" : "Like"} ({likeCount})
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TrendingPost;
