import React from "react";
import { BrowserRouter as Router, Route , Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect , useState} from 'react';
import Homepage from "./Components/Homepage/Homepage";
import LoginForm from "./Components/LoginForm/LoginForm";
import NavBar from "./Components/Homepage/NavBar";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import BlogPage from "./Components/Page/BlogPage/BlogPage";
import Sidebar from "./Components/SideBar/SideBar.tsx";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ProfilePageEdit from "./Components/ProfilePage/ProfilePageEdit";
import Write from "./Components/Page/Write/Write.jsx";
import Notification from "./Components/Page/NotificationPage/Notification.jsx";
import RenderSinglePage from "./Components/Page/BlogPage/SinglePage/RenderSinglePage.jsx";
import User from "./Components/ProfilePage/User/User.jsx";

//import cang trang moi vao day
import AboutUs from './Components/Page/Aboutus';
import Contact from './Components/Page/Contact';
import Trending from './Components/Page/Trending';


function AppContent() {
  
  const location = useLocation();
  const [hideNavbar, setHideNavbar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hiddenRoutes = ["/BlogPage", "/AnotherHiddenPage"];
    // Kiểm tra xem đường dẫn hiện tại có trong danh sách các đường dẫn ẩn Navbar hay không
    const shouldHideNavbar = hiddenRoutes.includes(location.pathname);
    // Chỉ cập nhật state nếu trạng thái mới thay đổi so với trạng thái hiện tại
    if (shouldHideNavbar !== hideNavbar) {
      setHideNavbar(shouldHideNavbar);
    }  
  }, [location.pathname, hideNavbar, navigate]);
 
  return (
    <div className="App">
      <div>
      {!hideNavbar && <NavBar/>}
      </div>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/SignUpForm" element={<SignUpForm/>} />
        <Route path="/BlogPage" element={<BlogPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/ProfilePageEdit" element={<ProfilePageEdit />} />
        <Route path="/Write" element = {<Write/>} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/SinglePage" element={<RenderSinglePage />} />
        <Route path="/User" element={<User />} />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
        <AppContent/>
    </Router>
  );
}

export default App;
