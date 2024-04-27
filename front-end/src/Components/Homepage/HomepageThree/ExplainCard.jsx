import React from "react";
import { Card, CardBody, Image, Stack , Heading, Text, Button, } from '@chakra-ui/react'
import { FcSearch } from "react-icons/fc";

const ExplainCard = () => {
    return (
        <Card maxW='sm'>
        <CardBody>
          <Image
            src='cat.jpg'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Become Deverloper</Heading>
            <Text>
              Trở thành top 1 trong lĩnh vực công nghệ thông tin với những bài viết chất lượng từ chuyên gia hàng đầu.
              Gần được 1000 bài viết từ các chuyên gia hàng đầu trong lĩnh vực công nghệ thông tin. 
            </Text>
            <Button rightIcon={<FcSearch/>} colorScheme='teal' variant='outline'>
              Explain now
            </Button>
          </Stack>
        </CardBody>
      </Card>
    )
}
export default ExplainCard;