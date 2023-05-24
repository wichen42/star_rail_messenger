import React from 'react'
import trailblazer from '../assets/trailblazer.png';

const Search = () => {
  return (
    <div className='search'>
      <div className='search-form'>
        <input type="text" placeholder='Find a User'/>
      </div>
      <div className='user-chat'>
        <img src={trailblazer} alt="" />
        <div className='user-chat-info'>
          <span>User</span>
        </div>
      </div>
    </div>
  )
}

export default Search