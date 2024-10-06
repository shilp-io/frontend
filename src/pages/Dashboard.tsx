import React from 'react';
import { Component } from '@/components/common/Component'; // Adjust the import path as necessary

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-8">
       <Component />
      </main>
      <footer className="bg-muted py-4 px-6 text-center">
      </footer>
    </div>
  );
};

