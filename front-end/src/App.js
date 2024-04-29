import React from "react";
import { BrowserRouter as Router, Route , Routes, useLocation } from "react-router-dom";
import { createContext, useState, useContext } from 'react';
import Homepage from "./Components/Homepage/Homepage";
import LoginForm from "./Components/LoginForm/LoginForm";
import NavBar from "./Components/Homepage/NavBar";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import BlogPage from "./Components/Page/BlogPage/BlogPage";

//import cang trang moi vao day
import AboutUs from './Components/Page/Aboutus';
import Contact from './Components/Page/Contact';
import Trending from './Components/Page/Trending';

const NavBarContext = createContext();

function NavBarProvider({ children }) {
  const [hideNavBar, setHideNavBar] = useState(false);

  return (
    <NavBarContext.Provider value={{ hideNavBar, setHideNavBar }}>
      {children}
    </NavBarContext.Provider>
  );
}

function useNavBar() {
  return useContext(NavBarContext);
}


function AppContent() {
  const { hideNavBar } = useNavBar();
  return (
    <div className="App">
      {!hideNavBar && <NavBar/>}
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/Trending" element={<Trending />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/SignUpForm" element={<SignUpForm/>} />
        <Route path="/BlogPage" element={<BlogPage />} state={{ hideNavBar: true }}/>
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <NavBarProvider>
        <AppContent/>
      </NavBarProvider>
    </Router>
  );
}

export default App;
