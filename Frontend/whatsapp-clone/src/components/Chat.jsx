import React from "react";
import "./Chat.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVert from "@mui/icons-material/MoreVert";
import Chatmessage from "./Chatmessage";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import MicIcon from "@mui/icons-material/Mic";
import axios from "../axios";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/v1/messages/sync");
      setMessages(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const pusher = new Pusher("f7634c0281cd14c6590a", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
    };
  }, [messages]);

  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post('/api/v1/messages/new',{
      message : input,
    name : "Stephen Hawlking", 
    receiver :true
    })
    setInput('')
  };

  

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen ....</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat_messageContainer">
        <Chatmessage messages={messages} />
      </div>

      <div className="chat_footer">
        <InsertEmoticonIcon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
