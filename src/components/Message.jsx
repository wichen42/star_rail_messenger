import React from 'react'
import PomPom from "../assets/pompom.jpg";

const Message = () => {
  return (
    <div className="message owner">
        <div className="message-info">
            <img src={PomPom} alt="" />
            <span>just now</span>
        </div>
        <div className="message-content">
            <span>User</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque magnam, aliquam, ut expedita repudiandae optio magni voluptatem impedit temporibus a ipsa quidem rerum fugiat aut. Suscipit blanditiis fuga magnam laboriosam.</p>
            <img src={PomPom} alt="" />
        </div>
    </div>
  )
}

export default Message