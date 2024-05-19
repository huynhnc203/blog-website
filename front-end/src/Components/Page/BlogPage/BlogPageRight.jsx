import React , {useState} from 'react'
import { HStack, Avatar, Heading ,Text} from '@chakra-ui/react'
import { BsDot } from 'react-icons/bs';
import { URL_LINK } from '../../Config';
import "./BlogPageRight.css";

export default function BlogPageRight() {
    const [search, setSearch] = useState('');   
    const [searchResult, setSearchResult] = useState([]);
    const [trangthaibinhthuong , setTrangthaibinhthuong] = useState(true)
    const link = URL_LINK + "/api/search"
    const makeSearch = async () => {
        const options = {
            method: 'POST',
            body:  JSON.stringify({
              "query": search
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(link, options)
          const result = await response.json()
          setSearchResult(result['data'].posts)
          setTrangthaibinhthuong(false)
          
    }

    return (
            <div className='blogpageright '>
            <div>
                <input type="text" id='search' placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress = {
                    (e) => {
                        if (e.key === 'Enter') {
                            makeSearch()
                        }
                    }
                
                } />
            </div>
            { trangthaibinhthuong ?
            <>
            <div className='li-tag'>
                <BsDot color='green' size='50px'/>
                <span>What We're Reading Today</span>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Gaurav Kumar'  src='default.png' />
                    <Heading as='h6' fontWeight={600} size='xs'>hcn</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Trên tay Razer Kishi Ultra: chơi game giả lập được, dễ sử dụng, phản hồi rung ngon</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Akash Kumawat' src='default.png' />
                    <Heading as='h6' fontWeight={600} size='xs'>hcn</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Sharge ra mắt Shargeek 140: Pin dự phòng 20.000mAh, công suất sạc 140W, giá 109 USD…</Heading>
            </div>
            <div className='topic'>
                <HStack spacing='10px'>
                    <Avatar size='xs' name='Pallav Sharma' src='https://bit.ly/broken-link' />
                    <Heading fontWeight={600} as='h6' size='xs'>hcn</Heading>
                </HStack>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>iOS 18: Apple đang chốt deal với OpenAI để mang ChatGPT lên iPhone</Heading>
                
            </div>

            <div className='topic'>
                <Text fontSize='xs' mt={4} color="green.500" cursor="pointer"> See the full list</Text>
            </div>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Reading list</Heading>
                <Text fontSize='sm' mt={4} color="gray.600" cursor="pointer"> Click the  on any story to easily add it to your reading list or a custom list that you can share.</Text>
            </div>
            </>
            : 
            
            <>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>{searchResult[0].title}</Heading>
            </div>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>{searchResult[1].title}</Heading>
            </div>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>{searchResult[2].title}</Heading>
            </div>

            <div className='topic'>
                <Text fontSize='xs' mt={4} color="green.500" cursor="pointer"> See the full list</Text>
            </div>
            <div className='topic'>
                <Heading as='h5' mt={2} cursor="pointer" size='sm'>Reading list</Heading>
                <Text fontSize='sm' mt={4} color="gray.600" cursor="pointer"> Click the  on any story to easily add it to your reading list or a custom list that you can share.</Text>
            </div>
            </> }
        </div> 
    )
}
