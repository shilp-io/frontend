import React from 'react';
import styles from '@/styles/pages/Home.module.scss';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to My App</h1>
      <p className={styles.description}>
        Simple home page.
      </p>
      <Link to="/chatbot">
        <Button className={styles.chatbotButton}>Try our Chatbot</Button>
      </Link>
    </div>
  );
};