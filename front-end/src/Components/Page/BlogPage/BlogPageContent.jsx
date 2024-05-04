import React from "react";
import {Flex, Box} from '@chakra-ui/react';
import './BlogPageContent.css';
import { FaArrowCircleRight } from "react-icons/fa";
import CardPostBox from "./CardPost/CardPostBox";
import { Container, Row , Col } from "react-bootstrap";
import  CardPostHorizontal from "./CardPost/CardPostHorizontal";
import { useEffect, useState  } from "react";



const Header = () =>{
    
    return (
        <>
        <h1>News</h1>
        <div className="fond">
            <div className="card">
                <div className="thumbnail">
                    <img className="left" src="anhvovan.jpg" />
                </div>
                <div className="right">
                    <h1>Why you Need More Magnesium in Your Daily Diet</h1>
                    <div className="author">
                        <img src="phuc.jpg" />
                        <h2>Huu Phuc</h2>
                    </div>
                    <p>Magnesium is one of the six essential macro-minerals that is required by the body for energy production and synthesis of protein and enzymes. It contributes to the development of bones and most importantly it is responsible for synthesis of your DNA and RNA. A new report that has appeared in theBritish Journal of Cancer, gives you another reason to add more magnesium to your diet...</p>
                </div>
                <div className="fab">
                    <FaArrowCircleRight size = {30}/>
                </div>
            </div>
        </div>
        </>
    );
}


const Content = () => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [allPosts, setAllPosts] = useState([])

    const getAllPosts = async () => {
    let res = await fetch('http://localhost:8000/api/posts')
    let data = await res.json()
    setAllPosts(data['data'])
    setIsLoaded(true)
  }
  useEffect(() => {
    getAllPosts()
  }, [])
  
  const maxLength = 200

    return (
        <Container>
          <h1>Content</h1>
          <p>This is the content of the page.</p>
          <Row>
             <Col><CardPostBox/></Col>
             <Col><CardPostBox/></Col>
             <Col><CardPostBox/></Col>
          </Row>
          <div>
          {isLoaded ? allPosts.slice(0, 6).map((post, index) => (
            <CardPostHorizontal 
            key = {index}
            load = {isLoaded}
            name = {post.author.name}
            title = {post.title}
            subtitle = {post.subtitle} 
            description = {post.body.length > maxLength ? post.body.substring(0, maxLength) + "..." : post.body}
             />
            )) : 
                Array(6).fill().map((_, index) => (
                    <CardPostHorizontal 
                    key = {index}
                    isLoaded = {isLoaded}
                    name = "chua co"
                    title = "chua co"
                    subtitle = "chua co"
                    />
                
            ))
            }
        </div>
        </Container>
    );
}

const BlogPageContent = () => {
    return(
    <Flex direction="column" minHeight="100vh">
      <Header />
      <Content />
    </Flex>
    )
}

export default BlogPageContent



