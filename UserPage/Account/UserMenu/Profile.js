import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {FaCamera} from 'react-icons/fa';
import Posts from '../Posts';
import {useSelector} from 'react-redux';
import Comments from '../Comments';

export default function Profile() {

  const commentsToggle = useSelector(state => state.CommentReducer.ActiveComments);

  const [UserData, setUserData] = useState([]);
  const [NewProfile, setNewProfile] = useState('');
  const [UserPost, setUserPost] = useState([]);
  const [UserFriends, setUserFriends] = useState([]);
  const [PostData, setPostData] = useState("");

  const Article = useRef(), inputPost = useRef(), InputProfile = useRef(), SendButton = useRef();
  const userId = parseInt(useParams().userId);

  useEffect(() => {
    axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
      type: "GetUsersPost", id: userId
    }))
      .then(resp => setUserData(resp.data));

    axios.post("http://localhost/Chat_System/src/BackEnd/Posts.php", new URLSearchParams({
      type: "GetUserPosts", UserId: userId
    }))
      .then(resp => setUserPost(resp.data));

    axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
      type: "GetUserFriend", UserId: userId
    }))
      .then(resp => setUserFriends(resp.data));
  }, []);

  useEffect(() => {
    if (NewProfile !== '') {
      axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', new URLSearchParams({
        type: "Update_Profile", UserId: userId, Profile: NewProfile
      }));
    }
  }, [NewProfile]);

  useEffect(() => {
    if (typeof PostData === 'string' && PostData !== '') {
      const date = new Date();
      const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const myPost = new URLSearchParams({
          PostArticle: Article.current.value, PostData: PostData,
          PostDate: now, UserId: parseInt(userId), type: "AddPost"
      });
      axios.post('http://localhost/Chat_System/src/BackEnd/Posts.php', myPost)
          .then(resp => setUserPost([...UserPost, resp.data]));
      Article.current.value = ''; inputPost.current.value = '';
  };
  }, [PostData]);

  function fileToBase64(file, callBack) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      callBack(reader.result);
    };
  };

  function ChangeProfileImage(e) {
    const img = e.target.files[0];
    fileToBase64(img, setNewProfile);
  };

  function AddPost() {
    const article = Article.current.value;
    const postData = inputPost.current.files[0];

    if (article) {
      if (postData) {
        fileToBase64(postData, setPostData);
      } else {
        setNewProfile("no Posts");
      }
    } else {
      alert("Write something !");
    }
  };

  return (
    <>
      {commentsToggle ? <Comments /> : null}
      <div className='Profile mx-auto border'>
        <div>
          <div className='border'>
              <img src={NewProfile ? NewProfile : UserData.Profile} width="100%" height="100%" style={{ borderRadius: "100%" }}/>
              <div className='ProfileIcon' onClick={() => InputProfile.current.click()}>
                <input type="file" ref={InputProfile} style={{ display: "none" }} onChange={ChangeProfileImage}
                  accept='.jpg, .png, .jpeg' />
                <FaCamera />
              </div>
          </div>
          <p>{`${UserData.FirstName} ${UserData.LastName}`}</p>
        </div>
        <div>
          <div className='createPost mb-3 p-3'>
              <textarea ref={Article} className="form-control p-2 mb-3" placeholder='Write your article' style={{ maxHeight: "60px", minHeight: "60px" }}></textarea>
              <div>
                  <div>
                      <input type="file" ref={inputPost} id='post' className="form-control" accept='.jpg, .png, .jpeg, .mkv, .mp4' />
                  </div>
                  <button ref={SendButton} className='btn btn-primary py-1 px-2' onClick={AddPost}>
                    Send <i className="bi bi-send"></i>
                  </button>
              </div>
          </div>
        </div>
        <div className='ProfileFriends border'>
          {UserFriends.map(ele => <Friends data={ele}/>)}
        </div>
        <div className='ProfilePosts border'>
          {UserPost.map(ele => <Posts data={ele} posts={setUserPost}/>)}
        </div>
      </div>
    </>
  );
};

function Friends({ data }) {

  const Parent = useRef();

  function DeleteFriend(FriendId) {
    axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
      type: "DeleteFriend", FriendId: FriendId
    }));
    Parent.current.remove();
  };

  return (
    <div key={data.id} ref={Parent} className='my-2 mx-auto p-2'>
      <div>
        <div className='ImageContent border'>
          <img src={data.Profile} width="100%" height="100%" style={{ borderRadius: "100%" }} />
        </div>
        <p className='ms-2'>{`${data.FirstName} ${data.LastName}`}</p>
      </div>
      <button className='btn btn-danger py-1 px-2' onClick={() => DeleteFriend(data.id)}>
        <i className="fa-solid fa-trash"></i> Delete Friend
      </button>
    </div>
  );
};