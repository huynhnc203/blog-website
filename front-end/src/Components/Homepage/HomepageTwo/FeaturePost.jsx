import React from 'react';
import CardBlog from './CardBlog';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect} from 'react';
import { URL_LINK } from '../../Config';
import { Text } from '@chakra-ui/react';

const FeaturePost = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [allPosts, setAllPosts] = useState([])
    const getURL = URL_LINK + '/api/posts'

    const getAllPosts = async () => {
        let res = await fetch(getURL)
        let data = await res.json()
        setAllPosts(data['data'])
        setIsLoaded(true)
      }
      useEffect(() => {
        getAllPosts()
      }, [])

    return (
        <Container>
            <div className='Title'>
                <Text fontSize='50px' fontWeight={700}>Featured Posts</Text>
            </div>
            <Row>
            {isLoaded ? allPosts.slice(0,3).map((post, index) => (
            <Col key={index} xs={12} md={4}>
            <CardBlog
            key = {index}
            load = {isLoaded}
            name = {post.author.name}
            date = {post.date}
            title = {post.title}
            subtitle = {post.subtitle} 
            like = {post.likes}
            id = {post.id} 
            authorid = {post.author.id}
             />
             </Col>
            )) : 
                Array(3).fill().map((_, index) => (
                    <Col key={index} xs={12} md={4}>
                    <CardBlog
                    key = {index}
                    isLoaded = {isLoaded}
                    name = "underfiled"
                    date = "00:00:00 00/00/0000"
                    title = "underfiled"
                    subtitle = "underfiled"
                    />
                </Col>
            ))
            }
            </Row>
        </Container>
    )


}
export default FeaturePost;