// socket/newsSocket.js
const News = require('../models/News');

module.exports = (io) => {
  // Store active users and their subscriptions
  const activeUsers = new Map();
  
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);
    
    // Initialize user's subscription
    activeUsers.set(socket.id, {
      subscriptions: ['All'] // Default subscription to all categories
    });
    
    // Handle category subscription
    socket.on('subscribe', async ({ categories }) => {
      try {
        if (!Array.isArray(categories)) {
          throw new Error('Categories must be an array');
        }
        
        // Validate categories against enum values
        const validCategories = ['All', 'Tech', 'Business', /*...*/];
        const invalid = categories.filter(c => !validCategories.includes(c));
        
        if (invalid.length > 0) {
          throw new Error(`Invalid categories: ${invalid.join(', ')}`);
        }
        
        // Rest of your existing code...
      } catch (error) {
        socket.emit('subscription_error', { message: error.message });
      }
    });
    
    
    // Handle category unsubscription
    socket.on('unsubscribe', ({ categories }) => {
      console.log(`User ${socket.id} unsubscribed from:`, categories);
      
      const userInfo = activeUsers.get(socket.id);
      if (userInfo) {
        // Update user's subscriptions
        const updatedSubscriptions = userInfo.subscriptions.filter(
          cat => !categories.includes(cat)
        );
        
        activeUsers.set(socket.id, {
          ...userInfo,
          subscriptions: updatedSubscriptions
        });
        
        // Leave socket rooms for each category
        categories.forEach(category => {
          socket.leave(`category:${category}`);
        });
      }
    });
    
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      activeUsers.delete(socket.id);
    });
  });
  
  // Function to send initial news data when a user subscribes
  async function sendInitialNews(socket, categories) {
    try {
      for (const category of categories) {
        const query = category === 'All' ? {} : { category };
        const news = await News.find(query)
          .sort({ publishedAt: -1 })
          .limit(10)
          .select('title summary category publishedAt imageUrl source isBreaking');
        
        socket.emit('initial_news', { category, news });
      }
    } catch (error) {
      console.error('Error sending initial news:', error);
    }
  }
  
  // Broadcast function for new news articles
  const broadcastNews = async (newsItem) => {
    // Broadcast to the specific category channel
    io.to(`category:${newsItem.category}`).emit('news_update', newsItem);
    
    // Broadcast to 'All' subscribers as well
    io.to('category:All').emit('news_update', newsItem);
    
    // If breaking news, send a special notification
    if (newsItem.isBreaking) {
      io.emit('breaking_news', newsItem);
    }
  };
  
  // Expose broadcastNews to be used by other modules
  return { broadcastNews };
};