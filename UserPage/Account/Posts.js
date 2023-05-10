import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Posts({ data, posts }) {
  const dispatch = useDispatch();

  const [LikesColor, setLikesColor] = useState('');
  const [DislikesColor, setDislikesColor] = useState('');
  const [LikeCount, setLikeCount] = useState([]);
  const [DislikeCount, setDislikeCount] = useState([]);
  const [TargetUser, setTargetUser] = useState([]);
  const userId = parseInt(useParams().userId);
  const [Show, setShow] = useState({display: "none"});
  const ModifiesMenu = useRef();

  useEffect(() => {
    axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', new URLSearchParams({
      type: "GetUsersPost", id: data.UserId
    }))
      .then(resp => setTargetUser(resp.data));

    axios.post('http://localhost/Chat_System/src/BackEnd/Posts.php', new URLSearchParams({
      type: "Likes&Dislikes", PostId: data.id
    }))
      .then(resp => {
        setLikeCount(resp.data.Likes); setDislikeCount(resp.data.Dislikes);
      });

      if (window.location.pathname.includes("Profile")) {
        setShow({});
      };
  }, []);

  useEffect(() => {
    if (LikeCount.includes(parseInt(userId))) {
      setLikesColor('text-primary');
    }
    else if (DislikeCount.includes(parseInt(userId))) {
      setDislikesColor('text-primary');
    }
  }, [LikeCount, DislikeCount]);

  function ReactWithLike() {
    if (LikesColor) {
      const NewLikeCount = LikeCount.filter(ele => {
        if (ele !== parseInt(userId)) {
          return ele;
        }
      });

      axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
        type: "DeleteInteraction", PostId: data.id, UserId: userId
      }));
      setLikesColor(''); setLikeCount(NewLikeCount);
    } else {
      if (DislikesColor) {
        const NewDislikeCount = DislikeCount.filter(ele => {
          if (ele !== parseInt(userId)) {
            return ele;
          };
        });

        axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
          type: "changingInteraction", PostId: data.id, UserId: userId, InteractionType: 'Like'
        }));

        setLikesColor('text-primary'); setDislikesColor('');
        setLikeCount([...LikeCount, userId]); setDislikeCount(NewDislikeCount);
      } else {
        axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
          PostId: data.id, UserId: userId, InteractionType: 'Like', type: "ReactWithPost"
        }));
        setLikesColor('text-primary'); setLikeCount([...LikeCount, parseInt(userId)]);
      }
    }
  };

  function ReactWithDislike() {
    if (DislikesColor) {
      const NewDislikeCount = DislikeCount.filter(ele => {
        if (ele !== parseInt(userId)) {
          return ele;
        };
      });

      axios.put(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
        type: "DeleteInteraction", PostId: parseInt(data.id), UserId: userId
      }));
      setDislikesColor(''); setDislikeCount(NewDislikeCount);
    } else {
      if (LikesColor) {
        const newLikeCount = LikeCount.filter(ele => {
          if (ele !== parseInt(userId)) {
            return ele;
          };
        });

        axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
          type: "changingInteraction", PostId: data.id, UserId: userId, InteractionType: 'Dislike'
        }));

        setDislikesColor('text-primary'); setLikesColor('');
        setDislikeCount([...DislikeCount, userId]); setLikeCount(newLikeCount);
      } else {
        axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
          PostId: data.id, UserId: userId, InteractionType: 'Dislike', type: "ReactWithPost"
        }))
        setDislikesColor('text-primary'); setDislikeCount([...DislikeCount, userId]);
      }
    }
  };

  function getFileTypeFromBase64(base64String) {
    if (base64String) {
      if (base64String.includes("/9j/")) {
        return "img";
      } else if (base64String.includes("iVBORw0KGgoAAAANSUhEUgAAA")) {
          return "img";
      } else if (base64String.includes("UklGR")) {
          return "img";
      } else if (base64String.includes("data:video/mp4;base64,")) {
          return "vedio";
      } else if (base64String.includes("data:video/webm;base64,")) {
          return "vedio";
      } else if (base64String.includes("data:video/ogg;base64,")) {
          return "vedio";
      } else if (base64String.includes("data:image/jpeg;base64,")) {
          return "img";
      } else if (base64String.includes("data:image/png;base64,")) {
          return "img";
      } else if (base64String.includes("data:image/gif;base64,")) {
          return "img";
      } else if (base64String.includes("data:video/x-matroska;base64,")) {
          return "vedio";
      } else {
          return "not";
      }
    }
  };

  function ImgOrVedio() {
    if (getFileTypeFromBase64(data.PostData) === 'img') {
      return <img src={data.PostData} />;
    } else if (getFileTypeFromBase64(data.PostData) === 'vedio') {
      return <video src={data.PostData} controls></video>;
    } else {
      return null;
    };
  };

  function ShowTheCommentsComponents() {
    dispatch({ type: 'ShowComments' });
    dispatch({ type: 'TragetPost', payload: data });
  };

  function DeletePost(id) {
    axios.post('http://localhost/Chat_System/src/BackEnd/Posts.php', new URLSearchParams({
      type: "DeletePost", PostId: id
    }));

    posts(prev => prev.filter(ele => ele.id !== data.id));
    ModifiesMenu.current.classList.toggle("HideModifiesMenu");
  };

  return (
    <div className='PostContent mb-2 p-3' key={data.id}>
      <div className='PostHeader'>
        <div className='border'>
          <img src={TargetUser.Profile} width='100%' height='100%' style={{ borderRadius: "100%" }} />
        </div>
        <p className='ms-2'>{`${TargetUser.FirstName} ${TargetUser.LastName}`}</p>
        <div className='PostMenu'>
          <div style={Show} onClick={() => ModifiesMenu.current.classList.toggle("HideModifiesMenu")}>
            <i class="fa-solid fa-ellipsis"></i>
          </div>
          <ul ref={ModifiesMenu} className='ModifiesMenu HideModifiesMenu p-2'>
            <li className='px-2 py-1 text-danger' onClick={() => DeletePost(data.id)}>
              <i className="fa-solid fa-trash"></i> <span>Delete Post</span>
            </li>
          </ul>
        </div>
      </div>
      <div className='Content_Post'>
        <div className='mb-2'>{data.PostActicle}</div>
        <div>
          {ImgOrVedio()}
        </div>
      </div>
      <div className='PostFooter border mt-2'>
        <div className={LikesColor} onClick={ReactWithLike}>
          <AiOutlineLike /><span className='ms-1'>{LikeCount.length}</span>
        </div>
        <div className={DislikesColor} onClick={ReactWithDislike}>
          <AiOutlineDislike /><span className='ms-1'>{DislikeCount.length}</span>
        </div>
        <div onClick={ShowTheCommentsComponents}><BiCommentDetail/></div>
      </div>
    </div>
  );
};