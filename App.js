import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './UserPage/EnterToAccount/Login';
import SignUp from './UserPage/EnterToAccount/SignUp';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/createaccount' element={<SignUp />} />
      </Routes>
    </Router>
  );
};