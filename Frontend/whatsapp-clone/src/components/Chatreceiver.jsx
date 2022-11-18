import React from 'react'

function Chatreceiver() {
  return (
    <div >
      <p className="chat_message chat_receiver">
        <span className="chat_name">Sam</span>
        This is a message
        <span className="chat_timestamp">{new Date().toUTCString()}</span>
      </p>
    </div>
  )
}

export default Chatreceiver