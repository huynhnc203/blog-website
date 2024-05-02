import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
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
            <Link to="/ProfilePage" className='nav-link'>Profile</Link>
            <Link to="/ProfilePage" className='nav-link'>Profile</Link>

            <NavDropdown title="" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Notification</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Story</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">My post</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Link to="/LoginForm">
            <button type="button" class="btn btn-transparent btn-rounded me-2" data-mdb-ripple-init>Login</button>
          </Link>
          <Link to="/SignUpForm">
            <button type="button" class="btn btn-dark btn-rounded me-2" data-mdb-ripple-init>Sign up</button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;