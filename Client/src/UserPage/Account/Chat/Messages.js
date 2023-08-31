import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Messages() {

  const TargetId = useSelector(state => state.ChatReducer.messages.targetId);
  const UserId = useSelector(state => state.ChatReducer.messages.userId);
  const dispatch = useDispatch();

  const [TargetMessages, setTargetMessages] = useState([]);
  const [UserMessages, setUserMessages] = useState([]);
  const [AllMessages, setAllMessages] = useState([]);

  const imageProfile = useRef(), mess = useRef();

  useEffect(() => {
    axios.post(`http://localhost/Chat_System/src/BackEnd/Users.php`, new URLSearchParams({
      type:"GetUsersPost", id: TargetId
    }))
      .then(resp => {
        imageProfile.current.src = resp.data.Profile;
      });

    axios.post("http://localhost/Chat_System/src/BackEnd/Chat.php", new URLSearchParams({
      type: "GetMessages", UserId: UserId, FriendId: TargetId
    }))
      .then(resp => {
        setUserMessages(resp.data.User);
        setTargetMessages(resp.data.Target);
      });
  }, []);

  useEffect(() => {
    if (TargetMessages.length > 0 && UserMessages.length > 0) {
      const messages = [...UserMessages, ...TargetMessages];
      messages.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
      setAllMessages(messages);
    }
    else if (TargetMessages.length > 0 && UserMessages.length === 0) {
      setAllMessages(TargetMessages);
    }
    else {
      setAllMessages(UserMessages);
    }
  }, [UserMessages, TargetMessages]);

  function BacktoChatMenu() {
    dispatch({type: "BacktoChatMenu"});
  };

  function SendMessage() {
    if (mess.current.value) {
      const curentdate = new Date();
      const data = {
        from: UserId,
        mess: mess.current.value, from: UserId,
        date: `${curentdate.getFullYear()}-${curentdate.getMonth() + 1}-${curentdate.getDate()} ${curentdate.getHours()}:${curentdate.getMinutes()}:${curentdate.getSeconds()}`
      };

      axios.post("http://localhost/Chat_System/src/BackEnd/Chat.php", new URLSearchParams({
        type: "SendMessage", ...data, friend: TargetId
      }))
      setAllMessages([...AllMessages, data]); mess.current.value = '';
    } else {
      alert('Write something !');
    };
  };

  return (
    <div className='messages'>
      <div>
        <div onClick={BacktoChatMenu}>
            <i className="bi bi-arrow-left"></i>
        </div>
        <div>
            <img src="" ref={imageProfile} width='100%' height='100%' style={{ borderRadius: "100%" }}/>
        </div>
      </div>
      <div className='py-2'>
        {AllMessages.map((ele, idx) => <Message comKey={idx} mess={ele.mess} from={ele.from} />)}
      </div>
      <form>
        <input type="text" ref={mess} className='form-control' style={{ width: "70%" }} placeholder='Write your message...' />
        <button type="button" className='btn btn-primary' style={{ width: "25%" }} onClick={SendMessage}>Send</button>
      </form>
    </div>
  );
};


function Message({ mess, from, comKey }) {
  const UserId = useSelector(state => state.ChatReducer.messages.userId);

  if (from === UserId) {
    return (
      <div key={comKey} className='ParentUser my-1'>
        <p className='User me-2'>{mess}</p>
      </div>
    );
  } else {
    return (
      <div key={comKey} className='my-1'>
        <p className='Target ms-2'>{mess}</p>
      </div>
    );
  };
};