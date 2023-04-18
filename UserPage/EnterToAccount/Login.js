import React, { useRef } from 'react';
import './ToAccount.css';
import axios from 'axios';

export default function Login() {

  const Email = useRef(), Password = useRef();

  function EnterToAccount(e) {
    e.preventDefault();
    axios.get('http://localhost:3005/Users').then(res => {
      res.data.find(ele => {
        if (ele.Email === Email.current.value && ele.Password === Password.current.value) {
          alert("welcome to your account");
        } else {
          alert("this account not found !");
        }
      });
    });
  };

  return (
    <div className='Parent'>
      <form className='w-50 border FormStyle py-4 px-5'>
        <h2 className='text-center my-2'>CS | Chat System</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" ref={Email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" ref={Password} className="form-control" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary text-end" onClick={EnterToAccount}>Submit</button>
        <p className='mt-2'>Create an account? <a href="/createaccount">Sign Up</a></p>
      </form>
    </div>
  );
};