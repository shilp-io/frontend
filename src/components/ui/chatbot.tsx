import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, PlusCircle, Send } from "lucide-react";
import styles from '@/styles/components/ui/chatbot.module.scss';

interface Message {
  text: string;
  isUser: boolean;
  files?: File[];
}

interface Chat {
  id: number;
  name: string;
}

export const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' },
  ]);
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() || fileInputRef.current?.files?.length) {
      const newMessage: Message = {
        text: input,
        isUser: true,
        files: fileInputRef.current?.files ? Array.from(fileInputRef.current.files) : undefined,
      };

      setMessages(prev => [...prev, newMessage]);
      
      // Simulate bot response (replace this with actual chatbot logic)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: `You said: ${input}`, isUser: false }]);
      }, 1000);
      
      setInput('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={styles.chatbot}>
      <div className={styles.sidebar}>
        <div className={styles.newChatButton}>
          <Button className={styles.fullWidth} onClick={() => setChats(prev => [...prev, { id: prev.length + 1, name: `Chat ${prev.length + 1}` }])}>
            <PlusCircle className={styles.icon} /> New Chat
          </Button>
        </div>
        <ScrollArea className={styles.chatList}>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`${styles.chatItem} ${selectedChat === chat.id ? styles.selected : ''}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              {chat.name}
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className={styles.chatArea}>
        <ScrollArea className={styles.messageArea}>
          {messages.map((message, index) => (
            <div key={index} className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}>
              <div className={styles.messageContent}>
                {message.text}
              </div>
              {message.files && message.files.map((file, fileIndex) => (
                <div key={fileIndex} className={styles.fileAttachment}>
                  <FileIcon className={styles.fileIcon} />
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          ))}
        </ScrollArea>
        <div className={styles.inputArea}>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className={styles.input}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".pdf"
            style={{ display: 'none' }}
            multiple
          />
          <Button onClick={handleFileUpload} variant="outline" className={styles.uploadButton}>
            <PlusCircle className={styles.icon} />
          </Button>
          <Button onClick={handleSend} className={styles.sendButton}>
            <Send className={styles.icon} />
          </Button>
        </div>
      </div>
    </div>
  );
};