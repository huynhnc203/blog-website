import React from "react";
import { Card, CardBody, Image, Stack, Heading, Text, Button, } from '@chakra-ui/react'
import { FcSearch } from "react-icons/fc";
import { AspectRatio } from "@chakra-ui/react"
import { useAuth } from "../../LoginForm/CheckLogin";

const ExplainCard = ({content, title, linkpic, link}) => {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  return (
    <Card maxW='sm' minH = '400px'>
      <CardBody>
        <Image src={linkpic} style={{width: '400px', height: '250px'}} alt="Image" />
        <Stack mt='6' spacing='3'>
          <Heading
            size='md'
            style={{ textAlign: 'center', margin: "0px" }}
          >
            {content}</Heading>
          <Text fontFamily='Lora' fontWeight={400}>
            {title}
          </Text>
          <a href= {link}>
            <Button rightIcon={<FcSearch />} colorScheme='teal' variant='outline' >
                Explain now 
            </Button>
          </a>
        </Stack>
      </CardBody>
    </Card >
  )
}
export default ExplainCard;