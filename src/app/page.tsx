"use client";
import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import InputBar from "../components/InputBar";
import Header from "@/components/Header";

const Home: React.FC = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async (newMessage: string) => {
    const newId = messages.length + 1;
    //@ts-ignore
    setMessages([
      ...messages,
      { id: newId, user: "user", message: newMessage },
    ]);
    setLoading(true);
    getAIAnswer(newMessage);
  };

  const getAIAnswer = async (prompt: string) => {
    const response = await fetch("/api/assistant/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    const answer = data.answer.choices[0].message.content;
    const newId = messages.length + 1;

    //@ts-ignore
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: newId + 1, user: "bot", message: answer },
    ]);
    setLoading(false);
  };

  return (
    <div className="mx-auto shadow-lg h-screen">
      <Header />
      <ChatBox messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSend} />
    </div>
  );
};

export default Home;
