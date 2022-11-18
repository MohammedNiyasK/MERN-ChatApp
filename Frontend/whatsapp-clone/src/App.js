import "./App.css";
import Sidebar from "./components/sidebar";
import Chat from "./components/Chat";

import axios from "./axios";

function App() {
  // const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("/api/v1/messages/sync");
  //     setMessages(response.data);
  //   };
  //   fetchData();
    
  // }, []);

  // useEffect(() => {
  //   const pusher = new Pusher("f7634c0281cd14c6590a", {
  //     cluster: "ap2",
  //   });

  //   const channel = pusher.subscribe("messages");
  //   channel.bind("inserted", (newMessage) => {
  //     setMessages([...messages,newMessage])

  //   });
    

  //   return () =>{
  //     channel.unbind_all();
  //   }

  // }, [messages]);

  return (
    <div className="app">
      <div className="app_body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default App;
