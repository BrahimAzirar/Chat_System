import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Posts({ data }) {

  const dispatch = useDispatch();

  const [LikesColor, setLikesColor] = useState(''); // this state for 'like' icons color
  const [DislikesColor, setDislikesColor] = useState(''); // this state for 'dislike' icons color
  const [LikeCount, setLikeCount] = useState(data.Likes.length);
  const [DislikeCount, setDislikeCount] = useState(data.Dislikes.length);
  const [TargetUser, setTargetUser] = useState([]);
  const userId = useParams().userId;

  useEffect(() => {
    axios.get('http://localhost:3005/Users').then(resp => resp.data.forEach(user => {
      if (user.id === data.sender) {
        setTargetUser({FirstName: user.FirstName, LastName: user.LastName, Profile: user.Profile});
      };
    }));

    if (data.Likes.includes(parseInt(userId))) {
      setLikesColor('text-primary');
    } else if (data.Dislikes.includes(parseInt(userId))) {
      setDislikesColor('text-primary');
    }

  }, []);

  function ReactWithLike() {
    if (LikesColor) {
      const NewLikeCount = data.Likes.filter(ele => {
        if (ele !== parseInt(userId)) {
          return ele;
        }
      });

      axios.put(`http://localhost:3005/Posts/${data.id}`, {...data, Likes: NewLikeCount});
      setLikesColor(''); setLikeCount(LikeCount - 1);
    } else {
      if (DislikesColor) {
        const NewDislikeCount = data.Dislikes.filter(ele => {
          if (ele !== parseInt(userId)) {
            return ele;
          };
        });

        axios.put(`http://localhost:3005/Posts/${data.id}`, {
          ...data, Likes: [...data.Likes, parseInt(userId)], Dislikes: NewDislikeCount
        });

        setLikesColor('text-primary'); setDislikesColor('');
        setLikeCount(LikeCount + 1); setDislikeCount(DislikeCount - 1);
      } else {
        axios.put(`http://localhost:3005/Posts/${data.id}`, {...data, Likes: [...data.Likes, parseInt(userId)]});
        setLikesColor('text-primary'); setLikeCount(LikeCount + 1);
      }
    }
  };

  function ReactWithDislike() {
    if (DislikesColor) {
      const NewDislikeCount = data.Dislikes.filter(ele => {
        if (ele !== parseInt(userId)) {
          return ele;
        };
      });

      axios.put(`http://localhost:3005/Posts/${data.id}`, {...data, Dislikes: NewDislikeCount});
      setDislikesColor(''); setDislikeCount(DislikeCount - 1);
    } else {
      if (LikesColor) {
        const NewLikeCount = data.Likes.filter(ele => {
          if (ele !== parseInt(userId)) {
            return ele;
          };
        });

        axios.put(`http://localhost:3005/Posts/${data.id}`, {
          ...data, Dislikes: [...data.Dislikes, parseInt(userId)], Likes: NewLikeCount
        });

        setDislikesColor('text-primary'); setLikesColor('');
        setDislikeCount(DislikeCount + 1); setLikeCount(LikeCount - 1);
      } else {
        axios.put(`http://localhost:3005/Posts/${data.id}`, {...data, Dislikes: [...data.Dislikes, parseInt(userId)]});
        setDislikesColor('text-primary'); setDislikeCount(LikeCount + 1);
      }
    }
  };

  function getFileTypeFromBase64(base64String) {
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
  }

  return (
    <div className='PostContent mb-2 p-3' key={data.id}>
      <div className='PostHeader'>
        <div className='border'>
          <img src={TargetUser.Profile} width='100%' height='100%' style={{ borderRadius: "100%" }} />
        </div>
          <p>{`${TargetUser.FirstName} ${TargetUser.LastName}`}</p>
      </div>
      <div className='Content_Post'>
        <div className='mb-2'>{data.PostArticle}</div>
        <div>
          {ImgOrVedio()}
        </div>
      </div>
      <div className='PostFooter border mt-2'>
        <div className={LikesColor} title='Likes' onClick={ReactWithLike}>
          <AiOutlineLike /><span className='ms-1'>{LikeCount}</span>
        </div>
        <div className={DislikesColor} title='Dislikes' onClick={ReactWithDislike}>
          <AiOutlineDislike /><span className='ms-1'>{DislikeCount}</span>
        </div>
        <div onClick={ShowTheCommentsComponents}><BiCommentDetail/></div>
      </div>
    </div>
  );
};