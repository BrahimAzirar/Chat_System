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

  const imageProfile = useRef();

  useEffect(() => {
    axios.get(`http://localhost:3005/Users/${TargetId}`).then(resp => {
      imageProfile.current.src = resp.data.Profile;
    });
    axios.get('http://localhost:3005/Chat').then(resp => {
      resp.data.forEach(ele => {
        if (ele.userId === UserId && ele.FriendId === TargetId) {
          setUserMessages(ele.messageInfo);
        }
        else if (ele.userId === TargetId && ele.FriendId === UserId) {
          setTargetMessages(ele.messageInfo);
        };
      });
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

  return (
    <div className='messages'>
      <div>
        <div onClick={BacktoChatMenu}>
            <i class="bi bi-arrow-left"></i>
        </div>
        <div>
            <img src="" ref={imageProfile} width='100%' height='100%' style={{ borderRadius: "100%" }}/>
        </div>
      </div>
      <div className='py-2'>
        {AllMessages.map((ele, idx) => <Message mess={ele.mess} from={ele.from}/>)}
      </div>
      <form>
        <input type="text" className='form-control' style={{ width: "70%" }} placeholder='Write your message...' />
        <button type="button" className='btn btn-primary' style={{ width: "25%" }}>Send</button>
      </form>
    </div>
  );
};


function Message({ mess, from }) {
  const UserId = useSelector(state => state.ChatReducer.messages.userId);
  const [WidthValue, setWidthValue] = useState(0);

  useEffect(() => {
    console.log(WidthValue);
  }, [WidthValue])

  if (from === UserId) {
    return <p className='User' onChange={e => setWidthValue(parseInt(e.target.offsetWidth))} style={{ left: `calc(100% - ${WidthValue}px)` }}>{mess}</p>
  } else {
    return <p className='Target'>{mess}</p>
  }
};