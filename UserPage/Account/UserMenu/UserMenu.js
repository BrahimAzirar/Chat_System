import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserMenu() {

  const [UserData, setUserData] = useState([]);

  const userId = parseInt(useParams().userId);

  useEffect(() => {
    axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
      type: "GetUsersPost", id: userId
    }))
      .then(resp => setUserData(resp.data));
  }, []);

  return (
    <div className='UserMenu my-3 mx-2 py-3 px-1'>
      <a href={`/account/${userId}/Profile`}>
        <div className='userdata p-2'>
          <div className='border'>
              <img src={UserData.Profile} width="100%" height="100%" style={{ borderRadius: "100%" }} />
          </div>
          <p className='ms-1 FullName'>{`${UserData.FirstName} ${UserData.LastName}`}</p>
        </div>
      </a>
      <div className='py-2 px-3 mt-2' onClick={() => window.location.href = '/'}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <p className='ms-1'>Log out</p>
      </div>
    </div>
  );
};