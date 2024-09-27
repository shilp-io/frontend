import React from 'react';
import styles from '@/styles/pages/Home.module.scss';

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Welcome to Shilp.io</h1>
      <p className={styles.description}>
        This is a simple home page.
      </p>
    </div>
  );
};