import React from 'react'
import trailblazer from '../assets/trailblazer.png';

const Navbar = () => {
  return (
    <div className='navbar'>
            <div className='header-left'>
              <span class="material-symbols-outlined" id="sms-icon">sms</span>
              <span id='header-title'>Messages</span>
            </div>

            <div className='header-right'>
                <img src={trailblazer} alt="" />
                <span>User</span>
                <button>Logout</button>
            </div>
    </div>
  )
}

export default Navbar