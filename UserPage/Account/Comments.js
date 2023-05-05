import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function Comments() {

    const Target = useSelector(state => state.CommentReducer.TargetPost);
    const dispatch = useDispatch();

    const [UsersComments, setUsersComments] = useState([]);
    const InputComment = useRef();
    const userId = parseInt(useParams().userId);

    useEffect(() => {
        axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
            PostId: Target.id, type: "GetComments"
        }))
            .then(resp => setUsersComments(resp.data));
    }, []);

    function HideTheCommentsComponent() {
        dispatch({ type: 'HideComments' });
        dispatch({ type: 'RemoveTarget' });
    };

    function SendComment() {
        if (InputComment.current.value) {
            const comment = {
                PostId: Target.id, UserId: userId, Comment: InputComment.current.value
            };
            axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
                ...comment, type: "AddComment"
            }));
            setUsersComments([...UsersComments, {
                target: userId, comment: InputComment.current.value
            }]); InputComment.current.value = '';
        } else {
            alert('Write somthing!');
        }
    };

  return (
    <div className='comment p-3'>
      <div onClick={HideTheCommentsComponent}>
        <i className="bi bi-x"></i>
      </div>
      <div>
        <form>
            <input type="text" ref={InputComment} className='form-control py-1 px-2 w-50' placeholder='Write you comment' />
            <button type="button" onClick={SendComment} className='btn btn-primary py-1 w-25 d-flex justify-content-center align-items-center'>
                <p className='me-1'>Send</p> <AiOutlineSend />
            </button>
        </form>
        <div className='UsersComments'>
            {UsersComments.length > 0 ? UsersComments.map((ele, idx) => <Users_Comments item={idx} content={ele}/>) :
            <p className='CommentAlert'>No comments yet</p>}
        </div>
      </div>
    </div>
  );
};


function Users_Comments({ item, content }) {

    const [TargetInfo, setTargetInfo] = useState({});

    useEffect(() => {
        axios.post(`http://localhost/Chat_System/src/BackEnd/Users.php`, new URLSearchParams({
            id: content.target, type: "GetUsersPost"
        }))
            .then(resp => setTargetInfo(resp.data));
    }, []);

    return (
        <div className='UserComment my-2' key={`${item}`}>
            <div className='me-2'>
                <img src={TargetInfo.Profile} alt="Profile" width='100%' height='100%' style={{ borderRadius: "100%" }}/>
            </div>
            <div>
                <p style={{ fontWeight: 700 }}>{`${TargetInfo.FirstName} ${TargetInfo.LastName}`}</p>
                <p>{content.comment}</p>
            </div>
        </div>
    );
};