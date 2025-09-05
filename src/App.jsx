import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi 👋 — I can answer construction-related questions. Ask me about materials, design, estimation, or safety." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();
      const reply = { role: "assistant", text: data.reply };

      setMessages([...newMessages, reply]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", text: "⚠️ Error contacting AI backend." }
      ]);
    }
  };

  return (
    <div className="chat-root">
      <div className="chat-window">
        <div className="header">🏗️ Construction Chatbot</div>

        <div className="messages">
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <div className="bubble">{m.text}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="composer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a construction question..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
