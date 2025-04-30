// controllers/newsController.js
const News = require('../models/News');
const { io } = require('..');

// Get news with pagination
exports.getNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const news = await News.find()
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    
    const total = await News.countDocuments();
    
    res.json({
      news,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get news by category
exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const news = await News.getNewsByCategory(category, page, limit);
    
    const query = category === 'All' ? {} : { category };
    const total = await News.countDocuments(query);
    
    res.json({
      news,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total
    });
  } catch (error) {
    console.error('Error fetching news by category:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get trending news
exports.getTrendingNews = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const trendingNews = await News.getTrendingNews(limit);
    
    res.json(trendingNews);
  } catch (error) {
    console.error('Error fetching trending news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new news article
exports.addNews = (io) => async (req, res) => {
  try {
    const newsData = req.body;
    const newNews = new News(newsData);
    await newNews.save();
    
    // Broadcast the new news
    io.emit('news_update', newNews);
    if (newNews.isBreaking) {
      io.emit('breaking_news', newNews);
    }
    
    res.status(201).json(newNews);
  } catch (error) {
    console.error('Error adding news:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Increment view count
exports.incrementView = async (req, res) => {
  try {
    const { id } = req.params;
    
    const news = await News.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    );
    
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    
    res.json({ viewCount: news.viewCount });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};