"use client";
import { useState } from "react";
import Image from "next/image";
import AIA from "../../public/AIA.png"; // chatbot icon
import styles from "./Chatbot.module.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Happy! Welcome to DewBloom! How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { from: "user", text: input }]);
    setInput("");
    // Simple bot reply (placeholder)
    setTimeout(() => {
      setMessages(prev => [...prev, { from: "bot", text: "Thanks for your message! I'll get back to you soon." }]);
    }, 1000);
  };

  return (
    <>
      {open && (
        <div className={styles.chatbox}>
          <div className={styles.header}>Happy Chat!</div>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${msg.from === "user" ? styles.user : styles.bot}`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <div className={styles.floatingIcon} onClick={() => setOpen(prev => !prev)}>
        <Image src={AIA} alt="Chatbot" width={60} height={60} />
      </div>
    </>
  );
}
