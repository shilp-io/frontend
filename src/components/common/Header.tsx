import React from 'react';
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import styles from '@/styles/components/common/Header.module.scss';
import { useTheme } from '@/hooks/useTheme';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <h1>shilp.io</h1>
        </Link>
        <Button onClick={toggleTheme} variant="ghost" size="icon">
          {theme === 'light' ? <Moon className={styles.icon} /> : <Sun className={styles.icon} />}
        </Button>
      </div>
    </header>
  );
};