import React from 'react'
import { HStack, Avatar, Heading ,Text} from '@chakra-ui/react'
import "./Right.css";
import { BsDot } from 'react-icons/bs';

export default function Right() {
    return (
            <div className='right' >
            <div>
                <input type="text" id='search' placeholder="Search" />
            </div>
            <div className='li-tag'>
                <BsDot color='green' size='50px'/>
                <span>What We're Reading Today</span>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='huynh'  src='huynh.jpg' />
                    <Heading as='h6' fontWeight={600} size='xs'>Nguyen Cong Huynh</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Review Ipad pro 2020 in 2024</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Rahul Panday' src='phuc.jpg' />
                    <Heading as='h6' fontWeight={600} size='xs'>Huu Phuc</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'> How to start with ReactJs</Heading>
            </div>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Reading list</Heading>
                <Text fontSize='sm' mt={4} color="gray.600" cursor="pointer"> Click the  on any story to easily add it to your reading list or a custom list that you can share.</Text>
            </div>
        </div> 
    )
}
