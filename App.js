import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './UserPage/EnterToAccount/Login';
import SignUp from './UserPage/EnterToAccount/SignUp';
import Account from './UserPage/Account/Account';
import AddFriends from './UserPage/Account/Friends/AddFriends';
import FriendsRequests from './UserPage/Account/Friends/FriendsRequests';
import UpdateData from './UserPage/Account/UpdateData';
import Profile from './UserPage/Account/UserMenu/Profile';

import { Provider } from 'react-redux';
import store from './Redux/Store';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createaccount' element={<SignUp />} />
        <Route path='/account/:userId/Profile' element={<Provider store={store}><Profile /></Provider>} />
        <Route path='/account/:userId' element={<Provider store={store}><Account /></Provider>} />
        <Route path='/account/:userId/Friends' element={<Provider store={store}><Account content={<AddFriends/>} /></Provider>} />
        <Route path='/account/:userId/FriendsRequests' element={<Provider store={store}><Account content={<FriendsRequests/>} /></Provider>} />
        <Route path='/account/:userId/UpdateData' element={<Provider store={store}><Account content={<UpdateData/>} /></Provider>} />
      </Routes>
    </Router>
  );
};