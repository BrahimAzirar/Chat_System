import React from 'react';
import { useSelector } from 'react-redux';

export default function Chat() {

  const messages = useSelector(state => state.ChatReducer.messages.component);

  return (
    <div className='Chats mt-3 p-2'>
      { messages }
    </div>
  );
};