import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './UserPage/EnterToAccount/Login';
import SignUp from './UserPage/EnterToAccount/SignUp';
import Account from './UserPage/Account/Account';

import { Provider } from 'react-redux';
import store from './Redux/Store';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createaccount' element={<SignUp />} />
        <Route path='/account/:userId' element={<Provider store={store}><Account /></Provider>} />
      </Routes>
    </Router>
  );
};