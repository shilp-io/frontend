import React from 'react';
import { Header } from './components/common/Header';
import { Home } from './pages/Home';
import { useTheme } from './hooks/useTheme';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChatbotPage } from './pages/ChatbotPage';

const App: React.FC = () => {
  useTheme(); // This will initialize the theme

  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;