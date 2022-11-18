import React from "react";

function Chatmessage({messages}) {


  return (
    <div >
    {messages.map((message) =>{
     return <p className={`chat_message ${message.receiver && "chat_receiver" }`}>
        <span className="chat_name">{message.name} </span>
        {message.message}
        <span className="chat_timestamp">{new Date().toLocaleString()}</span>
      </p>
    })}
      
    </div>
  );
}

export default Chatmessage;
