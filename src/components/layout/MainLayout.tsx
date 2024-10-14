import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <header>
        {/* Add header content here */}
      </header>
      <main>
        {children}
      </main>
      <footer>
        {/* Add footer content here */}
      </footer>
    </div>
  );
};

export default MainLayout;

