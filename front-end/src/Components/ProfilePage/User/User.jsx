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
          
        </div>
      </div>
    </div>
  );
};

export default User;
