import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Messages from './Messages';

export default function UsersChat() {

    const dispatch = useDispatch();

    const [FriendsList, setFriendsList] = useState([]);
    const userId = parseInt(useParams().userId);

    useEffect(() => {
      axios.post(`http://localhost/Chat_System/src/BackEnd/FriendsRequests.php`, new URLSearchParams({
        type: "GetFriends", UserId: userId
      }))
        .then(resp => setFriendsList(resp.data));
    }, []);

    function HideChat() {
        dispatch({ type: "HideChat" });
    };

    function SearchFriend(e) {
      // const FriendName = e.target.value; let FriendArr = [];
      // axios.get(`http://localhost:3005/Users/${userId}`).then(resp => {
      //   resp.data.FriendsList.forEach(ele => {
      //     axios.get(`http://localhost:3005/Users/${ele}`).then(friend => {
      //       if (FriendName) {
      //         const data = [];
      //         FriendArr = [...FriendArr, {
      //           FullName: `${friend.data.FirstName} ${friend.data.LastName}`, id: friend.data.id
      //         }];
      //         FriendArr.forEach(ele => {
      //           if (ele.FullName.includes(FriendName)) {
      //             data.push(ele.id);
      //           }
      //         });
      //         setFriendsList(data);
      //       } else {
      //         setFriendsList(resp.data.FriendsList);
      //       }
      //     });
      //   });
      // });
    }

  return (
    <>
      <div>
        <div className='row justify-content-between'>
          <h3 className='col-4 ms-2'>Chats</h3>
          <div onClick={HideChat} className='CancelChat me-2'><i className="bi bi-x"></i></div>
        </div>
        <div className='w-75 mx-auto mt-2'>
          <input type="text" onChange={SearchFriend} className='form-control px-2' placeholder='Search friend' />
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
        axios.post(`http://localhost/Chat_System/src/BackEnd/Users.php`, new URLSearchParams({
          type: "GetUsersPost", id: Friend
        }))
          .then(resp => setFriendData(resp.data));

        axios.post(`http://localhost/Chat_System/src/BackEnd/Chat.php`, new URLSearchParams({
          type: "LastMessage", UserId: userId, FriendId: Friend
        }))
          .then(resp => setLastMessage(resp.data))
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