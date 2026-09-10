import {useState} from "react";
import type {ChatMessage} from "../../types/chat";
import { askQuestion }  from "../../services/api";


export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () =>{
    //check if input is empty
    if(!inputMessage.trim()){
      return;
    }
    setLoading(true);
    setError("");
    try{
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage
    }
    setMessages(previousMessages => [...previousMessages, newMessage]);
    setInputMessage("");
    const responseMessage = await askQuestion(inputMessage);
    const assistantMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: responseMessage.response
    }
    setMessages(previousMessages => [...previousMessages, assistantMessage]);
  }catch{
    setError("Error while fetching answer");
  }finally{
    setLoading(false);
  }
  }


  return (
    <div>
      <h2>Chat</h2>
      <input placeholder="Ask your question" onChange={handleInputChange} value={inputMessage}/>  
      <button onClick={handleSendMessage} disabled={loading}>Send</button>  
      {loading && <p>Loading...</p>}  
      {error && <p>{error}</p>}
      {messages.map((message)=>(
        <div key={message.id}>
          <strong>{message.role}</strong>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  )
}
