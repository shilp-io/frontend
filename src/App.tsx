import React from 'react';
import { Header } from './components/common/Header';
import { Home } from './pages/Home';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  useTheme(); // This will initialize the theme

  return (
    <div className="app">
      <Header />
      <main>
        <Home />
      </main>
    </div>
  );
};

export default App;