import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Messages from './Messages';

export default function UsersChat() {

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
    <>
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
    </>
  );
};

function Friends({ item, Friend }) {

    const dispatch = useDispatch();

    const [FriendData, setFriendData] = useState({});
    const [LastMessage, setLastMessage] = useState('Send him a message');
    const userId = parseInt(useParams().userId);

    useEffect(() => {
        axios.get(`http://localhost:3005/Users/${Friend}`).then(resp => setFriendData(resp.data));
        axios.get(`http://localhost:3005/Chat`).then(resp => {
          const target1 = resp.data.filter(ele => {
            if (ele.userId === parseInt(Friend) && ele.FriendId === userId) {
              return ele.messageInfo;
            };
          });
          const target2 = resp.data.filter(ele => {
            if (ele.userId === userId && ele.FriendId === parseInt(Friend)) {
              return ele.messageInfo;
            };
          });

          if (target1[0].messageInfo[target1[0].messageInfo.length - 1].date <
            target2[0].messageInfo[target2[0].messageInfo.length - 1].date) {
            setLastMessage(target2[0].messageInfo[target2[0].messageInfo.length - 1].mess);
          } else {
            setLastMessage(target1[0].messageInfo[target1[0].messageInfo.length - 1].mess);
          }
        });
    }, []);

    function chatWithFriend() {
      dispatch({ type: "messageWithFriend", payload: {
        userId: userId, targetId: Friend, component: <Messages />
      } });
    };

    return (
        <div key={item} className='Friend my-1' onClick={chatWithFriend}>
            <div className='border'>
                <img src={FriendData.Profile} width="100%" height="100%" style={{ borderRadius: "100%" }} />
            </div>
            <div className='ms-1'>
                <p style={{ fontWeight: 700 }}>{`${FriendData.FirstName} ${FriendData.LastName}`}</p>
                <p style={{ fontSize: ".9rem" }} className='ms-1'>{LastMessage.length > 30 ? LastMessage.slice(0, 30) + '...' : LastMessage}</p>
            </div>
        </div>
    );
};