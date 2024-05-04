import React, { useEffect } from 'react';
import './CardPostHorizontal.css';
import { Skeleton} from '@chakra-ui/react'
import { useState } from 'react';
import { FaRegUserCircle } from "react-icons/fa";

const CardPostHorizontal = ({key ,load , name , title , subtitle , description}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const setload= (load) =>{
    setIsLoaded(load)
  }
  useEffect(() => {
    setload(load)
  }, [load])


  return (
    <>
    <div className="blogpostcardhorizontal mt-5">
      <div className="row">
        <div className="col-12">
          <article className="blog-card">
            <div className="blog-card__background">
              <div className="card__background--wrapper">
                <div className="card__background--main" style={{backgroundImage: "url('http://demo.yolotheme.com/html/motor/images/demo/demo_131.jpg')"}}>
                  <div className="card__background--layer"></div>
                </div>
              </div>
            </div>
            <div className="blog-card__head">
              <span className="date__box">
                <span className="date__day">11</span>
                <span className="date__month">JAN</span>
              </span>
            </div>
            <div className="blog-card__info">
              <Skeleton isLoaded = {isLoaded}>
                <h5>{title}</h5>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
                <p>{subtitle}</p>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
                <p>
                  <a href="#" className="icon-link mr-3"> <FaRegUserCircle size='20px' /> {name}</a>
                </p>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
                <p class='des'>{description}</p>
              </Skeleton>
              <Skeleton isLoaded = {isLoaded}>
              <a href="#" className="buttonreadmore"><i className="btn-icon fa fa-long-arrow-right"></i>READ MORE</a>
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

export default CardPostHorizontal;
