import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './store';
import { socketService } from './services/socketService';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import NewsFeed from './components/news/NewsFeed';
import TrendingNews from './components/news/TrendingNews';
import NewsDetail from './components/news/NewsDetail';
import NotificationContainer from './components/ui/NotificationContainer';
import './index.css';

function App() {
  useEffect(() => {
    // Connect to WebSocket server
    socketService.connect();
    
    // Clean up on unmount
    return () => {
      socketService.disconnect();
    };
  }, []);
  
  return (
    <Provider store={store}>
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
        <Header />
        <Sidebar /> {/* Now horizontal under the header */}
        <div className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<NewsFeed />} />
            <Route path="/trending" element={<TrendingNews />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/category/:category" element={<NewsFeed />} />
          </Routes>
        </div>
        <NotificationContainer />
      </div>
    </Router>
  </Provider>
  );
}

export default App;