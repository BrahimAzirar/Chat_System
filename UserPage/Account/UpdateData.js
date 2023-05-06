import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BiPencil } from 'react-icons/bi';
import { useParams } from 'react-router-dom';

export default function UpdateData() {

    const [FirstName, setFirstName] = useState('');
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [Thel, setThel] = useState('');
    const [Password, setPassword] = useState('');

    const FirstNameInput = useRef(), LastNameInput = useRef(), EmailInput = useRef();
    const ThelInput = useRef(), PasswordInput = useRef();

    const ComfPassInput = useRef(), OldPassInput = useRef();

    useEffect(() => {
        axios.post('http://localhost/Chat_System/src/BackEnd/Users.php', new URLSearchParams({
            type: "GetUser", id: userId
        }))
            .then(resp => {
                setFirstName(resp.data.FirstName); setLastName(resp.data.LastName);
                setEmail(resp.data.Email); setThel(resp.data.Thel); setPassword(resp.data.Password)
            });
    }, []);

    const userId = parseInt(useParams().userId);

    function Update_First_Last_Name(e) {
        if (e.target.textContent === 'Edite') {
            FirstNameInput.current.removeAttribute('readOnly');
            LastNameInput.current.removeAttribute('readOnly');
            e.target.textContent = 'Update';
        } else {
            FirstNameInput.current.setAttribute('readOnly', '');
            LastNameInput.current.setAttribute('readOnly', '');
            axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
                type: "Update_First_Last_Name", FirstName: FirstName, LastName: LastName, UserId: userId
            }));
            e.target.textContent = 'Edite';
        };
    };

    function Update_Email(e) {
        if (e.target.textContent === 'Edite') {
            EmailInput.current.removeAttribute('readOnly');
            e.target.textContent = 'Update';
        } else {
            EmailInput.current.setAttribute('readOnly', '');
            axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
                type: "Update_Email", Email: Email, UserId: userId
            }));
            e.target.textContent = 'Edite';
        };
    };

    function Update_Thel(e) {
        if (e.target.textContent === 'Edite') {
            ThelInput.current.removeAttribute('readOnly');
            e.target.textContent = 'Update';
        } else {
            ThelInput.current.setAttribute('readOnly', '');
            axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
                type: "Update_Thel", Thel: Thel, UserId: userId
            }));
            e.target.textContent = 'Edite';
        };
    };

    function Update_Password() {
        if (OldPassInput.current.value === '') {
            alert("Enter the old password !");
        }
        else if (OldPassInput.current.value !== Password) {
            alert("The old password incorrect !");
        }
        else if (PasswordInput.current.value !== ComfPassInput.current.value || PasswordInput.current.value === Password) {
            alert("The Password not valide !");
        }
        else {
            axios.post("http://localhost/Chat_System/src/BackEnd/Users.php", new URLSearchParams({
                type: "Update_Password", Password: PasswordInput.current.value, UserId: userId
            }));

            PasswordInput.current.value = ''; ComfPassInput.current.value = '';
            OldPassInput.current.value = '';
        }
    };

    function ChangeState(e, CallBack) {
        CallBack(e.target.value);
    };

  return (
    <div className='UpdatePage'>
      <div className='Up_First_Last_Name'>
        <p>To update your first and last name, please fill in the fields below: </p>
        <form className='mt-2'>
            <div>
                <input type="text" ref={FirstNameInput} className='form-control p-1' placeholder='New First Name'
                    value={FirstName} onChange={e => ChangeState(e, setFirstName)} readOnly/>
            </div>
            <div>
                <input type="text" ref={LastNameInput} className='form-control p-1' placeholder='New Last Name'
                    value={LastName} onChange={e => ChangeState(e, setLastName)} readOnly/>
            </div>
            <div className='mt-2 me-2'>
                <button type="button" className='btn btn-primary p-1' onClick={Update_First_Last_Name}>
                    <BiPencil/>
                    <p>Edite</p>
                </button>
            </div>
        </form>
      </div>
      <div  className='Up_Email'>
        <p>To update your Email, please enter your new Email address in the corresponding field and click the "Update" button. Your Email address will be updated in our system and you will receive a confirmation email.</p>
        <form className='mt-2'>
            <div>
                <input type="email" ref={EmailInput} className='form-control p-1' placeholder='New Email' 
                    value={Email} onChange={e => ChangeState(e, setEmail)} readOnly/>
             </div>
            <div className='mt-2'>
                <button type="button" className='btn btn-primary p-1 me-2' onClick={Update_Email}>
                    <BiPencil/>
                    <p>Edite</p>
                </button>
            </div>
        </form>
      </div>
      <div className='Up_Thel'>
        <p>To update your phone number, please enter the new number in the designated field and click the "Update" button. Your updated phone number will be saved in our system.</p>
        <form className='mt-2'>
            <div>
                <input type="text" ref={ThelInput} className='form-control p-1' placeholder='New Thel' 
                    value={Thel} onChange={e => ChangeState(e, setThel)} readOnly/>
             </div>
            <div className='mt-2'>
                <button type="button" className='btn btn-primary p-1 me-2' onClick={Update_Thel}>
                    <BiPencil/>
                    <p>Edite</p>
                </button>
            </div>
        </form>
      </div>
      <div className='Up_Password'>
        <p>To update your password, please enter your current password and then enter your new password twice to confirm. Click the "Update Password" button to save your changes.</p>
        <form className='mt-2'>
            <div className='my-1'>
                <input type="password" ref={OldPassInput} className='form-control p-1' placeholder='Old Password' />
            </div>
            <div className='my-1'>
                <input type="password" ref={PasswordInput} className='form-control p-1' placeholder='New password'/>
            </div>
            <div className='my-1'>
                <input type="password" ref={ComfPassInput} className='form-control p-1' placeholder='Comfermer Password'/>
            </div>
            <div className='mt-2'>
                <button type="button" className='btn btn-primary p-1 me-2' onClick={Update_Password}>
                    <BiPencil/>
                    <p>Edite</p>
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};