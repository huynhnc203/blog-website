import React from "react";
import {Flex} from '@chakra-ui/react';
import './BlogPageContent.css';
import { FaArrowCircleRight } from "react-icons/fa";
import CardPostBox from "./CardPost/CardPostBox";
import { Container, Row , Col } from "react-bootstrap";
import  CardPostHorizontal from "./CardPost/CardPostHorizontal";
import { useEffect, useState  } from "react";
import { Button } from "react-bootstrap";
import { FiChevronRight } from "react-icons/fi";
import {URL_LINK} from '../../Config';
import { Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';



const Header = () =>{
    return (
        <>
        <h1 class = "newfeedtitle"> News Feed</h1>
        <div className="fond">
            <div className="card">
                <div className="thumbnail">
                    <Image className="left" style={{width: "100%" , height: "100%"}} src="picture3.png" />
                </div>
                <div className="rightcontent">
                    <Link to="/SinglePage" onClick = {() => {localStorage.setItem('id', 3)}}>
                    <Text
                    fontFamily='Oswald'
                    fontSize='24px'
                    color = 'black'
                    fontWeight={700}
                    >
                     Trên tay Razer Kishi Ultra: chơi game giả lập được, dễ sử dụng, phản hồi rung ngon </Text>
                     </Link>
                    <div className="author">
                        <img src="default.jpg" />
                        <h2>hcn</h2>
                    </div>
                    <Text fontFamily='Lora' fontSize='18px'>Ở bài viết hôm trước mình đã trên tay cho anh em Kishi USB-C, nhưng đó chỉ là 1 sản phẩm tầm trung thôi, giờ là con Ultra xịn hơn rất nhiều. Đây là 1 sự lựa chọn hợp lý cho anh em nào đang có nhu cầu cho 1 chiếc máy có thể đem theo được, vì là nó đắm gắn vào điện thoại nên dường như anh em sẽ khó có thể quên mang theo được.</Text>
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

    const [count, setCount] = useState(7)
    const [countnext, setCountNext] = useState(10)

    const link = URL_LINK + '/api/posts'

    const getLoadMore = () => {
        setIsLoaded(false); 
        setTimeout(() => {
            setCount(count + 3);
            setCountNext(countnext + 3);
            setIsLoaded(true); 
        }, 1000);
    }
    
    const getAllPosts = async () => {
    let res = await fetch(link)
    let data = await res.json()
    setAllPosts(data['data'])
    setIsLoaded(true)
  }
  useEffect(() => {
    getAllPosts()
  }, [])
  
  const maxLength = 200

    return (
        // render card doc
        <Container>
          <h1>Content</h1>
          <div>
          <Row>
          {isLoaded ? allPosts.slice(count, countnext).map((post, index) => (
            <Col key={index} xs={12} md={4}>
            <CardPostBox
            key = {index}
            load = {isLoaded}
            name = {post.author.name}
            title = {post.title}
            subtitle = {post.subtitle} 
            idPost = {post.id}
             />
             </Col>
            )) : 
                Array(3).fill().map((_, index) => (
                    <Col key={index} xs={12} md={4}>
                    <CardPostBox
                    key = {index}
                    isLoaded = {isLoaded}
                    name = "underfiled"
                    title = "underfiled"
                    subtitle = "underfiled"
                    />
                </Col>
            ))
            }
            <div className="loadmore">
            <Col>
                <Button className="button__loadmore" onClick={getLoadMore}><FiChevronRight size='24px' /></Button>
            </Col>
            </div>
          </Row>
          
          </div>

            {/* render card ngang */}
          <div>
          {isLoaded ? allPosts.slice(0, 6).map((post, index) => (
            <CardPostHorizontal 
            key = {index}
            load = {isLoaded}
            name = {post.author.name}
            title = {post.title}
            subtitle = {post.subtitle} 
            description = {post.body.length > maxLength ? post.body.substring(0, maxLength) + "..." : post.body}
            date = {post.date.substring(0, 10)}
            idPost = {post.id}
            idUser = {post.author.id}
             />
            )) : 
                Array(6).fill().map((_, index) => (
                    <CardPostHorizontal 
                    key = {index}
                    isLoaded = {isLoaded}
                    name = "chua co"
                    title = "chua co"
                    subtitle = "chua co"
                    idPost = "chua co"
                    idUser = "chua co"
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



