import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function Posts({ data }) {
  const dispatch = useDispatch();

  const [LikesColor, setLikesColor] = useState('');
  const [DislikesColor, setDislikesColor] = useState('');
  const [LikeCount, setLikeCount] = useState([]);
  const [DislikeCount, setDislikeCount] = useState([]);
  const [TargetUser, setTargetUser] = useState([]);
  const userId = parseInt(useParams().userId);

  // useEffect(() => {
  //   axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', new URLSearchParams({
  //     type: "GetUsersPost", id: data.UserId
  //   }))
  //     .then(resp => setTargetUser(resp.data));

  //   axios.post('http://localhost/Chat_System/src/BackEnd/Posts.php', new URLSearchParams({
  //     type: "Likes&Dislikes", PostId: data.id
  //   }))
  //     .then(resp => {
  //       setLikeCount(resp.data.Likes); setDislikeCount(resp.data.Dislikes);
  //     });

  // }, []);

  useEffect(() => {
    const GetUsersPost = async () => {
      try {
        const result = (await axios.get(`http://localhost:8000/api/posts/userdata/${data.UserId}`)).data;
        if (result.err) throw new Error(result.err);
        if (result.response) {
          setTargetUser(result.response);
          console.log(result.response);
        }
      } catch (error) {
        alert(error.message);
      };
    };

    const GetLikesDislikes = async () => {
      try {
        const result = (await axios.get(`http://localhost:8000/api/Interaction/LikesDislikes/${data.PostId}`)).data;
        if (result.err) throw new Error(result.err);
        if (result.response) {
          setLikeCount(result.response.Likes); 
          setDislikeCount(result.response.Dislikes);
        }
      } catch (error) {
        alert(error.message);
      }
    }

    GetUsersPost();
    GetLikesDislikes();
  }, []);

  useEffect(() => {
    if (LikeCount.includes(parseInt(userId))) {
      setLikesColor('text-primary');
    }
    else if (DislikeCount.includes(parseInt(userId))) {
      setDislikesColor('text-primary');
    }
  }, [LikeCount, DislikeCount]);

  async function ReactWithLike() {
    if (LikesColor) {
      try {
        const NewLikeCount = LikeCount.filter(ele => {
          if (ele !== parseInt(userId)) {
            return ele;
          }
        });
  
        // axios.post(`http://localhost/Chat_System/src/BackEnd/Posts.php`, new URLSearchParams({
        //   type: "DeleteInteraction", PostId: data.id, UserId: userId
        // }));
  
        const result = await (await axios
          .delete(`http://localhost:8000/api/Interaction/DeleteInteraction/${data.PostId}/${data.UserId}`)).data

        if (result.err) throw new Error(result.err);
  
        setLikesColor(''); setLikeCount(NewLikeCount);
      } catch (error) {
          alert(error);
      }
    } else {
      if (DislikesColor) {
        try {
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
        } catch (error) {
            alert(error);
        }
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
  }

  return (
    <div className='PostContent mb-2 p-3' key={data.id}>
      <div className='PostHeader'>
        <div className='border'>
          <img src={TargetUser.Profile ? TargetUser.Profile : '/Images/ImageDefault.webp'} 
            width='100%' height='100%' style={{ borderRadius: "100%" }} />
        </div>
          <p>{`${TargetUser.FirstName} ${TargetUser.LastName}`}</p>
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