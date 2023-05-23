import React from 'react'
import Sidebar from "../components/Sidebar";
import Chats from "../components/Chats";

const Home = () => {
  return (
    <div className='home-container'>
        
        <div className='chat-overlay'>
            <Sidebar />
            <Chats />
        </div>
    </div>
  )
}

export default Home;
