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

const  CardPostBox =({key,load, name , title, subtitle, description}) => {
  const [liked, setLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const setload = (load) => {
    setIsLoaded(load);
  };
  
  useEffect(() => {
    setload(load)
  }, [load])
  

  return (
    <Center py={6}>
      <Box
        w="300px"
        rounded={'lg'}
        my={3}
        overflow={'hidden'}
        bg="white"
        border={'1px'}
        borderColor="black"
        boxShadow={useColorModeValue('6px 6px 0 black', '6px 6px 0 cyan')}>
        <Box h={'200px'} borderBottom={'1px'} borderColor="black">
          {isLoaded ?  
          <Img
            src={
              'huynh.jpg'
            }
            roundedTop={'sm'}
            objectFit="cover"
            h="full"
            w="full"
            alt={'Blog Image'}
          />
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
            <Text fontSize={'xs'} fontWeight="medium" color={'green'}>
              {subtitle}
            </Text>
            </Skeleton>
          </Box>
          <Skeleton isLoaded={isLoaded}>
          <Heading color={'black'} fontSize={'2xl'} /*gioi han so dong hien thi*/ noOfLines={1}>
            {title}
          </Heading>
          </Skeleton>
          <Skeleton isLoaded={isLoaded}>
          <Text color={'gray.500'} noOfLines={2}>
            {/* chỗ để title */}
            {description}
          </Text>
          </Skeleton>
        </Box>
        <HStack borderTop={'1px'} color="black">
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'lg'}
            cursor={'pointer'}
            w="full">
            <Text fontSize={'md'} fontWeight={'semibold'}>
              View more
            </Text>
            <BsArrowUpRight />
          </Flex>
          <Flex
            p={4}
            alignItems="center"
            justifyContent={'space-between'}
            roundedBottom={'sm'}
            borderLeft={'1px'}
            cursor="pointer"
            onClick={() => setLiked(!liked)}>
            {liked ? (
              <BsHeartFill fill="red" fontSize={'24px'} />
            ) : (
              <BsHeart fontSize={'24px'} />
            )}
          </Flex>
        </HStack>
      </Box>
    </Center>
  );
}
export default CardPostBox