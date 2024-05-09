import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './ProfilePage.css';
import { BsPlusCircleDotted } from "react-icons/bs";
import { useAuth } from '../LoginForm/CheckLogin';




const ProfilePage = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth();
    const [userData , setUserData] = useState([]);


    async function makeRequestWithJWT() {
        const options = {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          }
        };
        const response = await fetch('http://localhost:8000/api/authenticate/current_user', options);
        const result = await response.json();
        setUserData(result['data']);
      }
      
      useEffect(() => {
        makeRequestWithJWT();
      }, []);

      console.log(userData)
     
    return (
        <div className="profilepage-body">
        <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src= "default.jpg"  alt=""/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                                {isLoggedIn? userData.name : "User Name"}
                            </h5>
                            <h6>
                                {isLoggedIn? userData.description: "Description"}
                            </h6>
                            <p className="proile-rating">ID : <span>{isLoggedIn? userData.id: "ID"}</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                       <Link to="/ProfilePageEdit"> <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>Contact</p>
                            <a href="/#">Github</a><br/>
                            <a href="/#">Linked in</a><br/>
                            <a href="/#">Tinder</a> <br/>
                            <a href= "/#"><BsPlusCircleDotted style={{display: 'inline'}}/> Add</a><br/>
                            <p>SKILLS</p>
                            <a href="/#">Construc AI model</a><br/>
                            <a href="/#">Web Developer</a><br/>
                            <a href="/#">Python</a><br/>
                            <a href="/#">Learn React 3 day</a><br/>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>User Id </label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{isLoggedIn? userData.id : "id"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{isLoggedIn? userData.name : "name"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{isLoggedIn? userData.email: "email@gmail.com"}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>113</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Profession</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>AI and Software Enginear</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>
        </div>
    );
}

export default ProfilePage;
