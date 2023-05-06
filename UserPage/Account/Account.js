import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Account.css';
import Posts from './Posts';
import Comments from './Comments';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './Chat/Chat';
import { GrUpdate } from 'react-icons/gr';

export default function Account({ content = <AppPosts /> }) {

    const commentsToggle = useSelector(state => state.CommentReducer.ActiveComments);
    const chatToggle = useSelector(state => state.ChatReducer.ActiveChat);
    const dispatch = useDispatch();

    const [Profile, setProfile] = useState('');
    const userId = useParams().userId;

    useEffect(() => {
        const data = new URLSearchParams({
            type: "GetProfile", id: parseInt(userId)
        });
        axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', data)
            .then(resp => setProfile(resp.data));
    }, []);

    function ShowChats() {
        dispatch({ type: "ShowChat" });
    };

    function Search() {
        const Page = window.location.pathname;

        if (Page.includes("Friends")) {
            
        }
    };

  return (
    <>
        {commentsToggle ? <Comments /> : null}
        <div className={`Parent AccountHome ${commentsToggle ? 'disactive' : ''}`}>
            <header className='row align-items-center border p-2'>
                <h4 className='col-3'>CS|Chat System</h4>
                <div className='col-6 d-flex justify-content-center'>
                    <input type="search" className="form-control p-1 w-75" placeholder='Search'/>
                </div>
                <div className='col-3 row justify-content-center'>
                    <div className='col-3 mx-3 HeaderItems' onClick={ShowChats}>
                        <i className="bi bi-chat-dots"></i>
                    </div>
                    <div className='col-3 mx-3 HeaderItems'>
                        <i className="bi bi-bell"></i>
                    </div>
                    <div className='col-3 mx-3 HeaderItems'>
                        <a href="#"><img src={Profile} alt="Profile" width='100%' height='100%' style={{ borderRadius: "100%" }} /></a>
                    </div>
                </div>
            </header>
            <section className='row SectionHome'>
                <div className='Menu col-3 px-2 py-3'>
                    <ul className='navbar p-2'>
                        <li><a href={`/account/${userId}`}><i className="bi bi-house"></i> Home</a></li>
                        <li><a href={`/account/${userId}/Friends`}><span className="material-symbols-outlined">person_add</span>Add Friend</a></li>
                        <li><a href={`/account/${userId}/FriendsRequests`}><span className="material-symbols-outlined">person</span>Friends Requests</a></li>
                        <li><a href={`/account/${userId}/UpdateData`}><span><GrUpdate /></span>Update Data</a></li>
                    </ul>
                </div>
                <div className='Content col-6 p-3'>
                    {content}
                </div>
                <div className='col-3'>
                    {chatToggle ? <Chat/> : null}
                </div>
            </section>
        </div>
    </>
  );
};


function AppPosts() {

    const [PostData, setPostData] = useState([]);
    const [Post, setPost] = useState(null);
    const inputPost = useRef();

    const userId = useParams().userId;

    useEffect(() => {
        axios.post('http://localhost/Chat_System/src/BackEnd/Posts.php', new URLSearchParams({
            type: "GetAllPosts"
        }))
            .then(resp => setPostData(resp.data));
    }, []);

    useEffect(() => {
        if (typeof Post === 'string') {
            const date = new Date();
            const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            const myPost = new URLSearchParams({
                PostArticle: Article.current.value, PostData: Post,
                PostDate: now, UserId: parseInt(userId), type: "AddPost"
            });
            axios.post('http://localhost/Chat_System/src/BackEnd/Posts.php', myPost)
                .then(resp => setPostData([...PostData, resp.data]));
            Article.current.value = ''; inputPost.current.value = '';
        };
    }, [Post]);

    const Article = useRef();

    function fileToBase64(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setPost(reader.result);
        };
    };

    function SendPost() {
        if (Article.current.value) {
            if (Post) {
                fileToBase64(Post);
            } else {
                setPost('no Posts');
            }
            alert("the post sended !");
        } else {
            alert("Write something !")
        };
    };

    return (
        <>
            <div className='createPost mb-3 p-3'>
                <textarea ref={Article} className="form-control p-2 mb-3" placeholder='Write your article' style={{ maxHeight: "60px", minHeight: "60px" }}></textarea>
                <div>
                    <div>
                        <input type="file" ref={inputPost} id='post' onChange={e => setPost(e.target.files[0])} className="form-control" accept='.jpg, .png, .jpeg, .mkv, .mp4' />
                    </div>
                    <button className='btn btn-primary py-1 px-2' onClick={SendPost}>Send <i className="bi bi-send"></i></button>
                </div>
            </div>
            <div className='Posts'>
                {PostData.map(ele => <Posts data={ele}/>)}
            </div>
        </>
    );
};