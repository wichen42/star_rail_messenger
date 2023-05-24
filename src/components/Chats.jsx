import React from 'react'
import tc from '../assets/trash_can.png';

const Chats = () => {
  return (
    <div className='chats'>
      <div className='user-chat'>
        <img src={tc} alt="" />
        <div className='user-chat-info'>
          <span>User 1</span>
          <p>Bio Text</p>
        </div>
      </div>

      <div className='user-chat'>
        <img src={tc} alt="" />
        <div className='user-chat-info'>
          <span>User 2</span>
          <p>Bio Text</p>
        </div>
      </div>

      <div className='user-chat'>
        <img src={tc} alt="" />
        <div className='user-chat-info'>
          <span>User 3</span>
          <p>Bio Text</p>
        </div>
      </div>

      <div className='user-chat'>
        <img src={tc} alt="" />
        <div className='user-chat-info'>
          <span>User 4</span>
          <p>Bio Text</p>
        </div>
      </div>
    </div>
  )
}

export default Chats