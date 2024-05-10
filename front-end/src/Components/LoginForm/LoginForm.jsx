'use client'
import React from 'react'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from './CheckLogin';


const LoginForm = () => {
  const { setIsLoggedIn } = useAuth();
  const [email , setEmail] = useState('');
  const [password , setPassword] = useState('');
  const [datalogin , setDataLogin] = useState([]);
  const navigate = useNavigate();

  //hàm xử lý ở đây nhé Huynh
  const handlSignIn = () => {
    console.log(`test email : ${email}`)
    console.log(`test password : ${password}`)
    const fetchData = async () => {
      const body = {
        email: email,
        password: password
      }

      let resjson = await fetch('http://localhost:8000/api/authenticate/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )
      let login = await resjson.json()
      setDataLogin(login['data'])
      console.log(datalogin)
      localStorage.setItem('token', datalogin.access_token)
      console.log(`token : ${datalogin.access_token}`)

      if (localStorage.getItem('token') !== "undefined") {
          navigate('/');
          setIsLoggedIn(true);
      }
  }
  fetchData();
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handlSignIn}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
export default LoginForm;