import React from 'react'

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type something...' />
      <div className="send">
        <span class="material-symbols-outlined">attach_file</span>
        <input type="file" id="file" style={{display:"none"}}/>
        <label htmlFor="file">
          <span class="material-symbols-outlined">image</span>
        </label>
          <button>Send</button>
      </div>
    </div>
  )
}

export default Input