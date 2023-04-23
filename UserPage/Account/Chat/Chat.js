import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Chat() {

    const dispatch = useDispatch();

    const [FriendsList, setFriendsList] = useState([]);
    const userId = useParams().userId;

    useEffect(() => {
        axios.get(`http://localhost:3005/Users/${userId}`).then(resp => setFriendsList(resp.data.FriendsList));
    }, []);

    function HideChat() {
        dispatch({ type: "HideChat" });
    };

  return (
    <div className='Chats mt-3 p-2'>
      <div>
        <div className='row justify-content-between'>
          <h3 className='col-4 ms-2'>Chats</h3>
          <div onClick={HideChat} className='CancelChat me-2'><i className="bi bi-x"></i></div>
        </div>
        <div className='w-75 mx-auto mt-2'>
            <input type="text" className='form-control px-2' placeholder='Search friend' />
        </div>
      </div>
      <div className='Friends mt-1'>
        {FriendsList.length > 0 ? FriendsList.map((ele, idx) => <Friends item={idx} Friend={ele} />) :
        <p className='CommentAlert'>No Friends</p>}
      </div>
    </div>
  );
};

function Friends({ item, Friend }) {

    const [FriendData, setFriendData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3005/Users/${Friend}`).then(resp => setFriendData(resp.data));
    }, []);

    return (
        <div key={item} className='Friend my-1'>
            <div className='border'>
                <img src={FriendData.Profile} width="100%" height="100%" style={{ borderRadius: "100%" }} />
            </div>
            <div className='ms-1'>
                <p style={{ fontWeight: 700 }}>{`${FriendData.FirstName} ${FriendData.LastName}`}</p>
                <p style={{ fontSize: ".9rem" }}>Hi brahim</p>
            </div>
        </div>
    );
}