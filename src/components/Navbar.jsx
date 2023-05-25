import React, { useContext } from 'react'
import trailblazer from '../assets/trailblazer.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const {currentUser} = useContext(AuthContext);

  return (
    <div className='navbar'>
            <div className='header-left'>
              <span class="material-symbols-outlined" id="sms-icon">sms</span>
              <span id='header-title'>Messages</span>
            </div>

            <div className='header-right'>
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>
    </div>
  )
}

export default Navbar