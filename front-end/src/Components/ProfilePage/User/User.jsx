import React, {useEffect, useState} from 'react';
import { Text } from '@chakra-ui/react';
import { URL_LINK } from '../../Config';

const User = () => {
    const link = URL_LINK + "/api/users/" + localStorage.getItem('userId')
    const [user, setUser] = useState([])
 
   const makeRequestGetUser = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',   
        }
    }
    const response  = await fetch(link, options)
    const result = await response.json()
    setUser(result.data)
    console.log(user)
}

useEffect(() => {
    makeRequestGetUser()
}, [])

  return (
    <div className="py-5 px-4">
      <div className="container-fluid mx-auto">
        {/* Profile widget */}
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media d-flex profile-head">
              <div className="profile mr-3">
                <img
                  src="default.jpg"
                  alt="anh nen dep trai"
                  width="130"
                  className="rounded m-3 img-thumbnail"
                />
              </div>
              <div className="media-body mb-5 text-white">
                <Text fontSize = '25px' style={{fontWeight: 'bold'}} >{user.name}</Text>
                <p className="small mb-4">
                  <i className="fas fa-map-marker-alt mr-2"></i>{user.description}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-center text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">{user.posts}</h5>
                <small className="text-muted">
                  <i className="fas fa-image mr-1"></i>Post
                </small>
              </li>
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">{user.followers}</h5>
                <small className="text-muted">
                  <i className="fas fa-user mr-1"></i>Followers
                </small>
              </li>
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">{user.followings}</h5>
                <small className="text-muted">
                  <i className="fas fa-user mr-1"></i>Following
                </small>
              </li>
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0">About</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-0">Web Developer</p>
              <p className="font-italic mb-0">Lives in New York</p>
              <p className="font-italic mb-0">Photographer</p>
            </div>
          </div>
          <div className="py-4 px-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Recent Post</h5>
              <a href="#" className="btn btn-link text-muted">Show all</a>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-2 pr-lg-1">
                <img
                  src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-lg-6 mb-2 pl-lg-1">
                <img
                  src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-lg-6 pr-lg-1 mb-2">
                <img
                  src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
              <div className="col-lg-6 pl-lg-1">
                <img
                  src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                  alt=""
                  className="img-fluid rounded shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
