import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function AddFriends() {

    const Friends = useSelector(state => state.SearchReducer.searchResult);
    const dispatch = useDispatch();

    const [FriendsRequests, setFriendsRequests] = useState([]);

    const userId = parseInt(useParams().userId);

    useEffect(() => {
        axios.post('http://localhost/Chat_System/src/BackEnd/FriendsRequests.php', new URLSearchParams({
            type: "GetFriends", UserId: userId
        }))
            .then(response => {
                axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', new URLSearchParams({
                    type: "GetSomeUsersData"
                }))
                    .then(resp => {
                        const data = resp.data.filter(ele => {
                            if (ele.id !== userId && !(response.data.includes(ele.id))) {
                                return ele;
                            };
                        });
                        dispatch({type: "Target", payload: data});
                    });
            });

        axios.post('http://localhost/Chat_System/src/BackEnd/FriendsRequests.php', new URLSearchParams({
            type: "GetMyRequests", UserId: userId
        }))
            .then(resp => setFriendsRequests(resp.data));
    }, []);

    function CheckUser(userId) {
        let buttonValue = 'Add Friend';
        FriendsRequests.forEach(ele => {
            if (ele.FriendId === userId) {
                buttonValue = 'Request Sent';
            };
        });
        return buttonValue;
    };

    function SendFriendRequest(FriendId, e) {
        if (e.target.textContent === 'Add Friend') {
            const curentdate = new Date();
            const request = {
                UserId: userId,
                FriendId: FriendId,
                Date: `${curentdate.getFullYear()}-${curentdate.getMonth() + 1}-${curentdate.getDate()} ${curentdate.getHours()}:${curentdate.getMinutes()}:${curentdate.getSeconds()}`
            };

            axios.post(`http://localhost/Chat_System/src/BackEnd/FriendsRequests.php`, new URLSearchParams({
                ...request, type: "AddRequest"
            }));
            setFriendsRequests([...FriendsRequests, request]);

            e.target.textContent = 'Request Sent';
        } else {
            alert('You are aready sended request to this user !');
        }
    };

  return (
    <div className='ListUsers p-3'>
      {Friends.length > 0 ? Friends.map((ele, idx) => {
        return (
            <div key={idx} className='my-2'>
                <div className='userData'>
                    <div>
                        <img src={ele.Profile} width={'100%'} height={'100%'} style={{ borderRadius: '100%' }} alt="Profile"/>
                    </div>
                    <p className='ms-2'>{`${ele.FirstName} ${ele.LastName}`}</p>
                </div>
                <button type="button" className='btn btn-primary px-2 py-1 SendingBtn' onClick={(e) => SendFriendRequest(ele.id, e)}>
                    {CheckUser(ele.id)}
                </button>
            </div>
        );
      }) : <p className='py-2 text-center' style={{ fontSize: '1.1rem', fontWeight: 700 }}>No Friends</p>}
    </div>
  );
};