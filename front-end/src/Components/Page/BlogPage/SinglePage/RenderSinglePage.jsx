import React, { useContext , useEffect } from 'react';
import IdContext from './SinglePageContext';
import { useState } from 'react';
import './RenderSinglePage.css';
import PostHeader from './PostHeader';
import { HStack, Flex, Text } from '@chakra-ui/react';
import { BsArrowUpRight, BsHeart, BsHeartFill} from 'react-icons/bs';
import { CiShare1 } from "react-icons/ci";
import RenderComment from './Comment/RenderComment';
import { FaFacebookSquare, FaGithubSquare, FaLinkedin } from "react-icons/fa";
import {Link} from 'react-router-dom';  


const RenderSinglePage = () => {
    const [dataPost, setDataPost] = useState({});
    const [authorData, setAuthorData] = useState({})
    var x = 10;
    const [tym , setTym] = useState(false);
    const {id} = useContext(IdContext);
    var linkPost = "http://localhost:8000/api/posts/" + id 


    const makeRequestGetPostId = async () => {
        const options = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          };
          const response = await fetch(linkPost, options);
          const result = await response.json();
          setDataPost(result['data'])
          setAuthorData(result['data']['author'])
        }

    useEffect(() => {
        makeRequestGetPostId();
        console.log(authorData['name'])
    },[])
        
        
    return (
        <>
        <div className='renderpost'>
            <div className='box-1'>
                <PostHeader name = {authorData.name} created_at = {authorData['created_at']}/>
                <div className='tieude'>
                    <h1>{dataPost.title}</h1>
                </div>
                <div className='tieudephu'>
                    <h2>{dataPost.subtitle}</h2>
                </div>
                <div>
                    <p>Trong cuộc cách mạng công nghệ ngày nay, Apple vẫn tiếp tục đặt dấu ấn của mình với dòng sản phẩm iPad Pro. Với việc ra mắt iPad Pro 2020, hãng đã đưa ra một chiếc máy tính bảng mạnh mẽ, đẹp mắt và tiện ích hơn bao giờ hết. Từ thiết kế tinh tế cho đến hiệu suất ấn tượng, iPad Pro 2020 là biểu tượng của sự tiên tiến trong công nghệ di động.

                        Một trong những điểm nhấn đầu tiên khi nói về iPad Pro 2020 chính là màn hình Liquid Retina. Với kích thước lớn lên đến 12.9 inch (trong phiên bản lớn nhất), màn hình này không chỉ cung cấp một không gian làm việc rộng rãi mà còn tái tạo màu sắc và chi tiết với độ chính xác cao. Công nghệ ProMotion mang lại tỷ lệ làm mới 120Hz, tạo ra trải nghiệm mượt mà và phản hồi nhanh nhạy, phù hợp cho cả việc xem nội dung đa phương tiện và sử dụng ứng dụng đòi hỏi hiệu suất cao.

                        Không chỉ dừng lại ở màn hình, iPad Pro 2020 còn được trang bị bộ vi xử lý A12Z Bionic, một trong những con chip mạnh mẽ nhất trong dòng sản phẩm di động của Apple. Điều này mang lại hiệu suất vượt trội, từ việc chơi game, xem video 4K cho đến làm việc với các ứng dụng chuyên nghiệp như Adobe Photoshop hay AutoCAD. Việc kết hợp cùng với hệ thống camera và cảm biến LiDAR trên iPad Pro 2020 mở ra cánh cửa cho các ứng dụng thực tế ảo và thực tế tăng cường, đem lại trải nghiệm mới mẻ và đầy sáng tạo cho người dùng.

                        Về thiết kế, iPad Pro 2020 vẫn giữ nguyên phong cách đặc trưng của dòng sản phẩm này. Khung viền mỏng và góc bo tròn tạo nên một diện mạo hiện đại và sang trọng. Với các tùy chọn màu sắc bắt mắt như Silver và Space Gray, người dùng có thể tạo nên phong cách riêng cho chiếc máy tính bảng của mình. Việc tích hợp Magic Keyboard và Apple Pencil 2 cũng là một điểm nhấn, biến iPad Pro 2020 thành một công cụ sáng tạo hoàn hảo cho những người làm việc đòi hỏi độ chính xác cao và hiệu suất tốt.

                        Bên cạnh đó, iPad Pro 2020 cũng được nâng cấp về tính năng âm thanh với bộ loa kép cùng hệ thống microphone chất lượng cao. Điều này không chỉ làm cho trải nghiệm xem phim và nghe nhạc trở nên phong phú hơn mà còn giúp tăng cường hiệu suất trong các cuộc gọi video và hội thoại trực tuyến.

                        Một ưu điểm đặc biệt của iPad Pro 2020 chính là khả năng kết nối mạng 5G (tuỳ chọn) trong phiên bản Cellular, mở ra một thế giới mới về tốc độ truy cập internet và tải xuống dữ liệu. Điều này làm cho việc làm việc từ xa hoặc tiêu thụ nội dung trực tuyến trở nên mượt mà và thuận tiện hơn bao giờ hết.

                        Cuối cùng, việc tích hợp hệ điều hành iPadOS 14 cùng với các tính năng độc quyền của Apple như Slide Over và Split View tạo ra một môi trường làm việc linh hoạt và tiện lợi. Người dùng có thể dễ dàng quản lý các ứng dụng và nhiệm vụ khác nhau mà không bị gián đoạn, tạo điều kiện cho sự sáng tạo và hiệu suất tối đa.

                        Trong tổng thể, iPad Pro 2020 là một sản phẩm đỉnh cao của công nghệ di động hiện đại. Với sự kết hợp hoàn hảo giữa thiết kế đẹp mắt, hiệu suất ấn tượng và tính năng tiện ích, nó không chỉ là một chiếc máy tính bảng mà còn là một công cụ sáng tạo và làm việc hàng ngày đáng giá cho mọi người.</p>
                </div>
            <HStack borderTop={'1px'} color="black">
                <Flex
                    p={4}
                    alignItems="center"
                    justifyContent={'space-between'}
                    roundedBottom={'lg'}
                    cursor={'pointer'}
                    w="full">
                    <Text fontSize={'md'} fontWeight={'semibold'}>
                        Comment
                    </Text>
                    <CiShare1 size = '24px' />
                </Flex>
                <Flex
                    type = "button"
                    p={4}
                    alignItems="center"
                    justifyContent={'space-between'}
                    roundedBottom={'sm'}
                    borderLeft={'1px'}
                    cursor="pointer"
                    onClick={() => setTym(true)}>
                    {tym? (
                    <>
                        <Text> {x} </Text>
                    <BsHeartFill fill="red" fontSize={'24px'} />
                    </>
                    ) : (
                    <BsHeart fontSize={'24px'} />
                    )}
                </Flex>
        </HStack>
        
            <div className='post__comments'>
                    <RenderComment/>
            </div>

            </div> {/* end box-1 */}


            {/* box-2 */}
            <div className='box-2'>
                <div className="container mt-4 d-flex justify-content-center " style={{height: '800px'}}>
                <div className="card p-4">
                <div className="image d-flex flex-column justify-content-center align-items-center">
                <button className="btn btn-secondary">
                    <img src="default.jpg" height="100" width="100" alt="profile avatar" />
                </button>
                <span className="name mt-3">Huynh Gay</span>
                <span className="idd">@github</span>
                <span className='buttonFollow mt-3 '><button type="button" class="btn btn-dark rounded-4">Follow</button></span>
                <div className="d-flex flex-row justify-content-center align-items-center mt-3">
                    <span className="number">1069 <span className="follow">Followers</span></span>
                </div>
                <div className="text mt-3">
                    <span>Eleanor Pena is a creator of minimalistic x bold graphics and digital artwork.<br /></span>
                </div>
                <div className="gap-3 mt-4 icons d-flex flex-row justify-content-center align-items-center">
                    <span> <Link> <FaFacebookSquare size = '24px' /></Link> </span>
                    <span> <Link> <FaGithubSquare size = '24px'/> </Link></span>
                    <span>  <Link> <FaLinkedin size = '24px' /> </Link></span>
                </div>
                <div className="px-2 rounded mt-4 date">
                    <span className="join">Joined May,2021</span>
                </div>
                </div>
            </div>
            </div>
                    </div>{/* end box-2 */} 
        </div>
        </>    
    )
}

export default RenderSinglePage