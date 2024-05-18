import React, { useEffect, useContext } from 'react';
import './CardPostHorizontal.css';
import { Skeleton} from '@chakra-ui/react'
import { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import IdContext from '../SinglePage/SinglePageContext';
import { Text } from '@chakra-ui/react';

const CardPostHorizontal = ({key ,load , name , title , subtitle , description , date, idPost, idUser}) => {
  const {id, setId} = useContext(IdContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const setload= (load) =>{
    setIsLoaded(load)
  }
  useEffect(() => {
    setload(load)
  }, [load])

  
  // xet id vao local
  const handleGetID =(idPost)=>{
    setId(idPost)
    localStorage.setItem('id', idPost)
  };

  const setUserId = (userid) =>{
    localStorage.setItem('userId', userid)
  }
 
  return (
    <>
    <div className="blogpostcardhorizontal mt-5">
      <div className="row">
        <div className="col-12">
          <article className="blog-card">
            <div className="blog-card__background">
              <div className="card__background--wrapper">
                <div className="card__background--main" style={{backgroundImage: `url('picture${idPost}.png')`}}>
                </div>
              </div>
            </div>
            <div className="blog-card__head">
              <span className="date__box">
                <span className="date__day">{date}</span>
              </span>
            </div>
            <div className="blog-card__info">
              <Skeleton isLoaded = {isLoaded}>
                <Text fontSize='24px'
                fontFamily='Oswald'
                fontWeight='bold'
                color='grey' >
                <Link to = "/SinglePage" className='nav-link' onClick={() => handleGetID(idPost)} >{title}</Link> 
                </Text>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
                <Text 
                fontSize = '18px'
                fontFamily='Lora'
                fontWeight='medium'>
                {subtitle}</Text>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
                <p>
                  <Link to="/User" className="nav-link mr-3" onClick={() => setUserId(idUser)} > <FaRegUserCircle size='20px' /> {name}</Link>
                </p>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
              <Link to= "/SinglePage" className="nav-link"><Button colorScheme='blue' onClick={() => handleGetID(idPost)}>Read More</Button></Link>
              </Skeleton>
            </div>
            
          </article>
          
        </div>
      </div>
    </div>
    <section className="detail-page">
      <div className="container mt-5">
        
      </div>
    </section>

    </>
  );
  }
export default CardPostHorizontal ;
