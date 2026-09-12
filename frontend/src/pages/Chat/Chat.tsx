// import {useState} from "react";
// import type {ChatMessage} from "../../types/chat";
// import { askQuestion }  from "../../services/api";


// export const Chat = () => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [inputMessage, setInputMessage] = useState<string>("");
//   const[loading, setLoading] = useState(false);
//   const[error, setError] = useState("");


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // console.log(e.target.value);
//     setInputMessage(e.target.value);
//   };

//   const handleSendMessage = async () =>{
//     //check if input is empty
//     if(!inputMessage.trim()){
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try{
//     const newMessage: ChatMessage = {
//       id: Date.now().toString(),
//       role: "user",
//       content: inputMessage
//     }
//     setMessages(previousMessages => [...previousMessages, newMessage]);
//     setInputMessage("");
//     const responseMessage = await askQuestion(inputMessage);
//     const assistantMessage: ChatMessage = {
//       id: Date.now().toString(),
//       role: "assistant",
//       content: responseMessage.response
//     }
//     setMessages(previousMessages => [...previousMessages, assistantMessage]);
//   }catch{
//     setError("Error while fetching answer");
//   }finally{
//     setLoading(false);
//   }
//   }


//   return (
//     <div>
//       <h2>Chat</h2>
//       <input placeholder="Ask your question" onChange={handleInputChange} value={inputMessage}/>  
//       <button onClick={handleSendMessage} disabled={loading}>Send</button>  
//       {loading && <p>Loading...</p>}  
//       {error && <p>{error}</p>}
//       {messages.map((message)=>(
//         <div key={message.id}>
//           <strong>{message.role}</strong>
//           <p>{message.content}</p>
//         </div>
//       ))}
//     </div>
//   )
// }
import { useState } from "react";
import type { ChatMessage } from "../../types/chat";
import { askQuestion } from "../../services/api";
import "../../CSS/Chat.css";

export const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: inputMessage,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        newMessage,
      ]);

      setInputMessage("");

      const responseMessage = await askQuestion(inputMessage);

      const assistantMessage: ChatMessage = {
        id: Date.now().toString() + "-assistant",
        role: "assistant",
        content: responseMessage.response,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch {
      setError("Error while fetching answer");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !loading) {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-page">
      {/* Header */}
      <section className="chat-header">
        <div className="chat-symbol">✦</div>

        <p className="chat-eyebrow">AI MYTHOLOGY ASSISTANT</p>

        <h1>Ask the Knowledge Engine</h1>

        <p>
          Have a conversation about gods, stories, relationships,
          powers, and ancient mythology.
        </p>
      </section>

      {/* Chat container */}
      <section className="chat-container card">

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="chat-empty">
              <div className="empty-symbol">✦</div>

              <h3>Begin your exploration</h3>

              <p>
                Ask a question to start a conversation with the
                mythology knowledge engine.
              </p>

              <div className="suggested-questions">
                <button
                  onClick={() =>
                    setInputMessage("Who is Zeus?")
                  }
                >
                  Who is Zeus?
                </button>

                <button
                  onClick={() =>
                    setInputMessage("Who are the parents of Athena?")
                  }
                >
                  Who are Athena's parents?
                </button>

                <button
                  onClick={() =>
                    setInputMessage("Tell me about Krishna")
                  }
                >
                  Tell me about Krishna
                </button>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${
                message.role === "user"
                  ? "user-message"
                  : "assistant-message"
              }`}
            >
              <div className="message-label">
                {message.role === "user" ? "You" : "Knowledge Engine"}
              </div>

              <div className="message-content">
                {message.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="chat-message assistant-message">
              <div className="message-label">
                Knowledge Engine
              </div>

              <div className="message-content loading-message">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask about mythology..."
            value={inputMessage}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />

          <button
            className="primary-button chat-send-button"
            onClick={handleSendMessage}
            disabled={loading || !inputMessage.trim()}
          >
            {loading ? "Thinking..." : "Send"}
          </button>
        </div>

        {error && (
          <div className="chat-error">
            {error}
          </div>
        )}

        <p className="chat-note">
          Answers are generated using the mythology knowledge base.
        </p>
      </section>
    </div>
  );
};