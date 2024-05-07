import React from 'react'
import { HStack, Avatar, Heading ,Text} from '@chakra-ui/react'
import { BsDot } from 'react-icons/bs';
import "./BlogPageRight.css";

export default function BlogPageRight() {
    return (
            <div className='blogpageright '>
            <div>
                <input type="text" id='search' placeholder="Search" />
            </div>
            <div className='li-tag'>
                <BsDot color='green' size='50px'/>
                <span>What We're Reading Today</span>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Gaurav Kumar'  src='https://bit.ly/broken-link' />
                    <Heading as='h6' fontWeight={600} size='xs'>Gaurav Kumar</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>My 2022 summer lists</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Akash Kumawat' src='https://bit.ly/broken-link' />
                    <Heading as='h6' fontWeight={600} size='xs'>Akash Kumawat</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Can Reading Fiction Make You a Better Person?</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Pallav Sharma' src='https://bit.ly/broken-link' />
                    <Heading fontWeight={600} as='h6' size='xs'>Pallav Sharma</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Hate NFTs? I have some bad news for you…</Heading>
                
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Rahul Panday' src='https://bit.ly/broken-link' />
                    <Heading as='h6' fontWeight={600} size='xs'>Rahul Panday</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>We Are Still Good</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Aausaf Alam' src='https://bit.ly/broken-link' />
                    <Heading as='h6' fontWeight={600} size='xs'>Aausaf Alam</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Be the Person You Are on Vacation</Heading>
            <Text fontSize='xs' mt={4} color="green.500" cursor="pointer"> See the full list</Text>
            </div>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Reading list</Heading>
                <Text fontSize='sm' mt={4} color="gray.600" cursor="pointer"> Click the  on any story to easily add it to your reading list or a custom list that you can share.</Text>
            </div>
        </div> 
    )
}
