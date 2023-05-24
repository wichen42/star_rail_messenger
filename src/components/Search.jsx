import React from 'react'

const Search = () => {
  return (
    <div className='search'>
      <div className='search-form'>
        <input type="text" placeholder='Find a User'/>
      </div>
      <div className='user-chat'>
        <img src="https://images.pexels.com/photos/16881619/pexels-photo-16881619/free-photo-of-nunca-tan-lejos-de-la-realidad.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load" alt="" />
        <div className='user-chat-info'>
          <span>User</span>
        </div>
      </div>
    </div>
  )
}

export default Search