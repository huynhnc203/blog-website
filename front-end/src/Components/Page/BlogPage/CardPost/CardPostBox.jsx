import { useState, useEffect } from 'react';

import {
  Box,
  Heading,
  Text,
  Img,
  Flex,
  Center,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react';
import { BsArrowUpRight, BsHeartFill, BsHeart } from 'react-icons/bs';
import { Skeleton } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom';

const  CardPostBox =({key,load, name , title, subtitle, idPost}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const pictureLink = "picture" + idPost + ".png";

  const setload = (load) => {
    setIsLoaded(load);
  };
  
  useEffect(() => {
    setload(load)
  }, [load])
  
  const setIdPost = (idPost) => {
    localStorage.setItem('id', idPost)
  }

  return (
    <Center py={6}>
      <Box
        w="300px"
        minH='550px'
        rounded={'lg'}
        my={3}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
        <Box h={'250px'} borderBottom={'1px'} borderColor="black">
          {isLoaded ?
          <Link to = "/SinglePage"  onClick={() => setIdPost(idPost)}>  
           <Img
            src= {pictureLink} 
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
          </Link>
          : 
         
          <Spinner/>
        
            
          } 
        </Box>
        <Box p={4}>
          <Box
            display={'inline-block'}
            px={2}
            py={1}
            color="whrite"
            mb={2}>
            <Skeleton isLoaded={isLoaded}>
            <Text fontSize='15px' fontWeight="medium" color={'green'}>
              {subtitle}
            </Text>
            </Skeleton>
          </Box>
          <Skeleton isLoaded={isLoaded}>
          <Text className='' fontWeight='medium' style={{fontSize: '20px'}} fontFamily='Oswald' color={'black'} fontSize={'l'}>
            <Link to= "/SinglePage" className='nav-link' onClick={()=> setIdPost(idPost)} >{title}</Link>
          </Text>
          </Skeleton>
          <Skeleton isLoaded={isLoaded}>
          <Text color={'gray.500'} noOfLines={2}>
          </Text>
          </Skeleton>
        </Box>
      </Box>
    </Center>
  );
}
export default CardPostBox