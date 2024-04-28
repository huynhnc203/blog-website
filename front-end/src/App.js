import React from "react";
import { BrowserRouter as Router, Route , Routes } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";
import LoginForm from "./Components/LoginForm/LoginForm";
import NavBar from "./Components/Homepage/NavBar";
import SignUpForm from "./Components/SignUpForm/SignUpForm";

//import cang trang moi vao day
import AboutUs from './Components/Page/Aboutus';
import Contact from './Components/Page/Contact';
import Trending from './Components/Page/Trending';


function App() {
  return (
    <Router>
    <div className="App">
      <NavBar/>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/Trending" element={<Trending />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Aboutus" element={<AboutUs />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/SignUpForm" element={<SignUpForm/>} />
        </Routes>
    </div>
    </Router>
  );
}

export default App;
