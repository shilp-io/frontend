import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-100 dark:bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          Logo | Shilp
        </a>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/dashboard">Get Started</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
