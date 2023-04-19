import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Account.css';

export default function Account() {

    const [Profile, setProfile] = useState('');
    const userId = useParams().userId;

    useEffect(() => {
        axios.get('http://localhost:3005/Users').then(resp => resp.data.forEach(element => {
            if (element.id === parseInt(userId)) {
                setProfile(element.Profile);
            };
        }));
    }, []);

  return (
    <div className='Parent'>
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
            <div className='Menu col-3'></div>
            <div className='Content col-6'>
                <div className='createPost'></div>
                <div className='Posts'></div>
            </div>
            <div className='col-3'></div>
        </section>
    </div>
  );
};