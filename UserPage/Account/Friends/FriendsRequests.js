import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function FriendsRequests() {

    const [FriendsRequ, setFriendsRequ] = useState([]);

    const userId = parseInt(useParams().userId);

    useEffect(() => {
        axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', new URLSearchParams({
            type: "GetFriendsRequests", UserId: userId
        }))
            .then(resp => setFriendsRequ(resp.data));
    }, []);

    function AcceptFriend(FriendId) {
        axios.post(`http://localhost/Chat_System/src/BackEnd/FriendsRequests.php`, new URLSearchParams({
            type: "AcceptingFriend", UserId: userId, FriendId: FriendId
        }));
        setFriendsRequ(prev => prev.filter(ele => ele.id !== FriendId));
    };

    function DisacceptFriend(FriendId) {
        axios.post('http://localhost/Chat_System/src/BackEnd/FriendsRequests.php', new URLSearchParams({
            type: "DisacceptingFriend", UserId: FriendId, FriendId: userId
        }));
        setFriendsRequ(prev => prev.filter(ele => ele.id !== FriendId));
    };

  return (
    <div className='ListUsers p-3'>
      {FriendsRequ.length > 0 ? FriendsRequ.map((ele, idx) => {
        return (
            <div key={idx} className='my-2'>
                <div className='userData'>
                    <div>
                        <img src={ele.Profile} width={'100%'} height={'100%'} style={{ borderRadius: '100%' }} alt="Profile"/>
                    </div>
                    <p className='ms-2'>{`${ele.FirstName} ${ele.LastName}`}</p>
                </div>
                <div>
                    <button type="button" className='btn btn-danger me-1 px-2 py-1 SendingBtn' onClick={() => DisacceptFriend(ele.id)}>
                        Disaccept
                    </button>
                    <button type="button" className='btn btn-primary ms-1 px-2 py-1 SendingBtn' onClick={() => AcceptFriend(ele.id)}>
                        Accept
                    </button>
                </div>
            </div>
        );
      }) : <p className='py-2 text-center' style={{ fontSize: '1.1rem', fontWeight: 700 }}>No Friends Requests</p>}
    </div>
  );
};