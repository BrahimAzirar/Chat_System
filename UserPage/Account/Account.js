import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Account.css';
import Posts from './Posts';
import Comments from './Comments';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './Chat/Chat';

export default function Account() {

    const commentsToggle = useSelector(state => state.CommentReducer.ActiveComments);
    const chatToggle = useSelector(state => state.ChatReducer.ActiveChat);
    const dispatch = useDispatch();

    const [PostData, setPostData] = useState([]);
    const [Profile, setProfile] = useState('');
    const [Post, setPost] = useState(null);
    const inputPost = useRef();
    const Article = useRef();
    const userId = useParams().userId;

    useEffect(() => {
        axios.get('http://localhost:3005/Users').then(resp => resp.data.forEach(element => {
            if (element.id === parseInt(userId)) {
                setProfile(element.Profile);
            };
        }));
        axios.get('http://localhost:3005/Posts').then(resp => setPostData(resp.data));
    }, []);

    useEffect(() => {
        if (typeof Post === 'string') {
            axios.post('http://localhost:3005/Posts', {
                PostArticle: Article.current.value, PostData: Post,
                Likes: [], Dislikes: [], PostDate: new Date(), sender: parseInt(userId),
                Comments: []
            });
            Article.current.value = ''; inputPost.current.value = '';
        };
    }, [Post]);

    function RemovePost(id) {
        axios.delete(`http://localhost:3005/Posts/${id}`);
    };

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

    function ShowChats() {
        dispatch({ type: "ShowChat" });
    }

  return (
    <>
        {commentsToggle ? <Comments /> : null}
        <div className={`Parent AccountHome ${commentsToggle ? 'disactive' : ''}`}>
            <header className='row align-items-center border p-2'>
                <h4 className='col-4'>CS|Chat System</h4>
                <div className='col-5'>
                    <input type="search" className="form-control p-1" placeholder='Search'/>
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
                <div className='Menu col-3 p-3'>
                    <ul className='navbar'>
                        <li><a href="#"><i className="bi bi-house"></i> Home</a></li>
                    </ul>
                </div>
                <div className='Content col-6 p-3'>
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
                </div>
                <div className='col-3'>
                    {chatToggle ? <Chat/> : null}
                </div>
            </section>
        </div>
    </>
  );
};