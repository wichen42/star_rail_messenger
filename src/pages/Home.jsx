import React from 'react'
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import Register from "./Register";

const Home = () => {
  return (
    <div className='home'>
        
        <div className='container'>
            {/* <Sidebar />
            <Chat /> */}
            <Register />
        </div>
    </div>
  )
}

export default Home;
