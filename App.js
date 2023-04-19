import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './UserPage/EnterToAccount/Login';
import SignUp from './UserPage/EnterToAccount/SignUp';
import Account from './UserPage/Account/Account';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createaccount' element={<SignUp />} />
        <Route path='/account/:userId' element={<Account />} />
      </Routes>
    </Router>
  );
};