import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { useAuth } from '../LoginForm/CheckLogin';
import './NavBar.css';

function NavBar() {
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  console.log(isLoggedIn);  



  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#"><img src='logo.png' style={{ height: "50px", width: "150px" }}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link to="/" className='nav-link'>Homepage</Link>
            <Link to="/BlogPage" className='nav-link'>Blog</Link>
            <Link to="/Aboutus" className='nav-link'>About us</Link>
            <Link to="/Trending" className='nav-link'>Trending</Link>
            <Link to="/Contact" className='nav-link'>Contact</Link>
            <NavDropdown title="" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Notification</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Story</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">My post</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          { isLoggedIn ? (
          <>
          <Link to="/ProfilePage" className='nav-link'>
          <button><FaRegUserCircle size = '35px' style = {{marginRight : '15px'}} /></button>
          </Link>
          <button type="button" class="btn btn-dark btn-rounded me-2" data-mdb-ripple-init
          onClick={() => {localStorage.removeItem('token'); setIsLoggedIn(false);  window.location.reload() }}>
          Logout
          </button>
          </>
          
      ) : (
        <>
          <Link to="/LoginForm">
            <button type="button" class="btn btn-transparent btn-rounded me-2" data-mdb-ripple-init>Login</button>
          </Link>
          <Link to="/SignUpForm">
            <button type="button" class="btn btn-dark btn-rounded me-2" data-mdb-ripple-init>Sign up</button>
          </Link>
          </>
      )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;