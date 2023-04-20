import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Account.css';

export default function Account() {

    const [Profile, setProfile] = useState('');
    const [Post, setPost] = useState(null);
    const Article = useRef();
    const userId = useParams().userId;

    useEffect(() => {
        axios.get('http://localhost:3005/Users').then(resp => resp.data.forEach(element => {
            if (element.id === parseInt(userId)) {
                setProfile(element.Profile);
            };
        }));
    }, []);

    function SendPost() {
        if (Article.current.value) {
            axios.post('http://localhost:3005/Posts', {
                PostArticle: Article.current.value, PostData: JSON.stringify(Post),
                Likes: 0, Dislikes: 0, PostDate: new Date(), sender: parseInt(userId)
            }).then(resp => console.log(resp.data));
        } else {
            alert("Write something !")
        };
    }

  return (
    <div className='Parent AccountHome'>
        <header className='row align-items-center border p-2'>
            <h4 className='col-4'>CS|Chat System</h4>
            <div className='col-5'>
                <input type="search" className="form-control p-1" placeholder='Search'/>
            </div>
            <div className='col-3 row justify-content-center'>
                <div className='col-3 mx-3 HeaderItems'>
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
            <div className='Menu col-3'>
                <ul>
                    <li><a href="#"><i class="bi bi-house"></i> Home</a></li>
                </ul>
            </div>
            <div className='Content col-6 p-3'>
                <div className='createPost'>
                    <textarea ref={Article} className="form-control p-2 mb-3" placeholder='Write your article' style={{ maxHeight: "100px", minHeight: "50px" }}></textarea>
                    <div>
                        <div>
                            <input type="file" id='post' onChange={e => setPost(e.target.files[0])} className="form-control" accept='.jpg, .png, .jpeg, .mkv, .mp4' />
                        </div>
                        <button className='btn btn-primary py-1 px-2' onClick={SendPost}>Send <i className="bi bi-send"></i></button>
                    </div>
                </div>
                <div className='Posts'></div>
            </div>
            <div className='col-3'></div>
        </section>
    </div>
  );
};