// Modify the POST route to pass io
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

module.exports = (io) => {
  router.get('/', newsController.getNews);
  router.get('/category/:category', newsController.getNewsByCategory);
  router.get('/trending', newsController.getTrendingNews);
  router.post('/', newsController.addNews(io)); // Pass io here
  router.put('/:id/view', newsController.incrementView);
  router.get('/:id', newsController.getNewsById);
  return router;
};