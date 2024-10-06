import Reat, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, PlusCircle, Send, X } from "lucide-react";
import styles from '@/styles/pages/ChatbotPage.module.scss';
import { uploadPdf } from '@/api';
import { useApi } from '@/hooks/useApi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
}

interface Chat {
  id: string;
  name: string;
  messages: Message[];
}

interface UploadedFile {
  id: string;
  name: string;
  file: File;
}

export const ChatbotPage: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(() => {
    const savedChats = localStorage.getItem('chats');
    return savedChats ? JSON.parse(savedChats) : [{ id: '1', name: 'New Chat', messages: [] }];
  });
  const [selectedChat, setSelectedChat] = useState<string>(chats[0].id);
  const [input, setInput] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>(() => {
    const savedFiles = localStorage.getItem('uploadedFiles');
    return savedFiles ? JSON.parse(savedFiles) : [];
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('chats', JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const { execute: executePdfUpload } = useApi<string>(uploadPdf);

  const handleSend = async () => {
    if (input.trim() || uploadedFiles.length > 0) {
      const attachments: string[] = [];
            // Upload each file
      for (const uploadedFile of uploadedFiles) {
        try {
          const uploadResult = await executePdfUpload(uploadedFile.file, 'user123'); // Replace 'user123' with actual user ID
          attachments.push(uploadResult);
        } catch (error) {
          console.error(`Failed to upload file ${uploadedFile.name}:`, error);
          // Optionally, you can add error handling here, such as showing an error message to the user
        }
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        text: input,
        isUser: true,
        timestamp: Date.now(),
      };

      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat
            ? { ...chat, messages: [...chat.messages, newMessage] }
            : chat
        )
      );
      
      // Simulate bot response (replace this with actual chatbot logic)
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `You said: ${input}`,
          isUser: false,
          timestamp: Date.now() + 1,
        };
        setChats(prevChats => 
          prevChats.map(chat => 
            chat.id === selectedChat
              ? { ...chat, messages: [...chat.messages, botResponse] }
              : chat
          )
        );
      }, 1000);
      
      setInput('');
      setUploadedFiles([]);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map(file => ({
        id: Date.now().toString() + file.name,
        name: file.name,
        file: file
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileDelete = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `New Chat ${chats.length + 1}`,
      messages: []
    };
    setChats(prev => [...prev, newChat]);
    setSelectedChat(newChat.id);
  };

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbot}>
        <div className={styles.sidebar}>
          <div className={styles.newChatButton}>
            <Button className={styles.fullWidth} onClick={createNewChat}>
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
            {chats.find(chat => chat.id === selectedChat)?.messages.map((message) => (
              <div key={message.id} className={`${styles.message} ${message.isUser ? styles.userMessage : styles.botMessage}`}>
                <div className={styles.messageContent}>
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className={styles.inputArea}>
            <div className={styles.filePreviewArea}>
              {uploadedFiles.map(file => (
                <div key={file.id} className={styles.filePreview}>
                  <FileIcon className={styles.fileIcon} />
                  <span className={styles.fileName}>{file.name}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={styles.deleteFile} 
                    onClick={() => handleFileDelete(file.id)}
                  >
                    <X className={styles.icon} />
                  </Button>
                </div>
              ))}
            </div>
            <div className={styles.inputWrapper}>
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
              <Button onClick={() => fileInputRef.current?.click()} variant="outline" className={styles.uploadButton}>
                <PlusCircle className={styles.icon} />
              </Button>
              <Button onClick={handleSend} className={styles.sendButton}>
                <Send className={styles.icon} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
