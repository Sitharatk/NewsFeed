// services/socketService.js
import { io } from 'socket.io-client';
import store from '../store';
import { addRealTimeNews } from '../actions/newsAction';
import { showNotification } from '../actions/uiActions';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL ;

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }
  
  connect() {
    if (this.socket) return;
    
    this.socket = io(SOCKET_URL);
    
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
      this.isConnected = true;
      
      // Subscribe to previously subscribed categories
      const { subscribedCategories } = store.getState().categories;
      this.socket.emit('subscribe', { categories: subscribedCategories });
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
      this.isConnected = false;
    });
    
    // Listen for initial news data
    this.socket.on('initial_news', ({ category, news }) => {
      news.forEach(item => {
        store.dispatch(addRealTimeNews(category, item));
      });
    });
    
    // Listen for news updates
    this.socket.on('news_update', (news) => {
      store.dispatch(addRealTimeNews(news.category, news));
    });
    
    // Listen for breaking news
    this.socket.on('breaking_news', (news) => {
      const { notificationsEnabled } = store.getState().ui;
      
      if (notificationsEnabled) {
        store.dispatch(showNotification(
          `BREAKING: ${news.title}`,
          'urgent'
        ));
      }
      
      store.dispatch(addRealTimeNews(news.category, news));
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }
  
  emit(event, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(event, data);
    }
  }
}

export const socketService = new SocketService();
export default socketService;