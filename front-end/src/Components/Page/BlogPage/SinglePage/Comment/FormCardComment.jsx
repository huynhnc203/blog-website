import React, {useState, useEffect} from "react";
import {Image} from '@chakra-ui/react'
import { useAuth } from '../../../../LoginForm/CheckLogin';
import { useNavigate } from "react-router-dom";

const FormCardComment = ({id}) => {
  const link = 'http://localhost:8000/api/comment/' + id
  const [comments, setComments] = useState('')
  const [userData, setUserData] = useState([])
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  const navigate = useNavigate();


  async function makeRequestWithJWT() {
    if(isLoggedIn){
      const options = {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      };
      const response = await fetch('http://localhost:8000/api/authenticate/current_user', options);
      const result = await response.json();
      setUserData(result['data']);
      console.log(result['data']);
      }
  }
  
  const makeRequestAddComments = async (comments) => {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: JSON.stringify({
          'body': comments,
          })
      };
      const response = await fetch(link, options);
      setComments('')
    }

    useEffect(() => {
       makeRequestWithJWT();
    }, []);


  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-12">
          <div className="card card-white post">
            <div className="post-heading d-flex">
              <div className="float-left image">
                <Image
                  src="default.jpg"
                  className="rounded-circle me-2"
                  width= "40px"
                  height= "40px"
                  alt="avatar of user"
                />
              </div>
              <div className="float-left meta">
                <div className="title h5">
                  <a href="#">
                    <b>{isLoggedIn ? userData.name : "NONAME"}</b>
                  </a>
                </div>
                <h6 className="text-muted time">time</h6>
              </div>
            </div>
            <div className="card-body py-1">
              <form>
                <div>
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="visually-hidden"
                  >
                    Comment
                  </label>
                  <textarea
                    className="form-control form-control-sm border border-2 rounded-3"
                    id="exampleFormControlTextarea1"
                    style={{ height: "50px" }}
                    placeholder="Add a comment..."
                    minLength={3}
                    maxLength={255}
                    required
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  ></textarea>
                </div>
              </form>
            </div>
            <footer className="card-footer bg-transparent border-0 text-end">
              <button className="btn btn-link btn-sm me-2 text-decoration-none">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary btn-sm" onClick={() => {
                if(isLoggedIn){
                  makeRequestAddComments(comments);
                }else {
                  navigate('/LoginForm');
                }
                }}>
                Submit
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCardComment;
