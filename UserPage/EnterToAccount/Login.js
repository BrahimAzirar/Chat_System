import React, { useRef } from 'react';
import './ToAccount.css';
import axios from 'axios';

export default function Login() {

  const Email = useRef(), Password = useRef();

  function EnterToAccount(e) {
    e.preventDefault();
    axios.get('http://localhost/Chat_System/src/BackEnd/Users.php').then(res => {
      const EnterToAccount = res.data.find(ele => {
        if (ele.Email === Email.current.value && ele.Password === Password.current.value) {
          return ele;
        }
      });
      if (EnterToAccount) {
        window.location.href = `/account/${EnterToAccount.id}`;
      } else {
        alert("This account not found !");
      }
    });
  };

  return (
    <div className='Parent'>
      <form className='w-50 border FormStyle py-4 px-5'>
        <h2 className='text-center my-2'>CS | Chat System</h2>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label mb-2">Email address</label>
          <input type="email" ref={Email} className="form-control SelfStyle" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label mb-2">Password</label>
          <input type="password" ref={Password} className="form-control SelfStyle" id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary text-end SelfStyle" onClick={EnterToAccount}>Submit</button>
        <p className='mt-2'>Create an account? <a href="/createaccount">Sign Up</a></p>
      </form>
    </div>
  );
};