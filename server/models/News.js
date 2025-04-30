
// models/News.js
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true // Index for faster search by title
  },
  content: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Tech', 'Business', 'Sports', 'Entertainment', 'Health', 'Science', 'Politics'],
    index: true // Index for faster filtering by category
  },
  author: {
    type: String,
    required: true
  },
  source: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  imageUrl: {
    type: String
  },
  publishedAt: {
    type: Date,
    default: Date.now,
    index: true // Index for sorting and filtering by date
  },
  isBreaking: {
    type: Boolean,
    default: false
  },
  
  viewCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Compound index for category + date queries (common search pattern)
NewsSchema.index({ category: 1, publishedAt: -1 });
NewsSchema.index({ isBreaking: 1 });
// Method to find trending news using aggregation pipeline
NewsSchema.statics.getTrendingNews = async function(limit = 10) {
  return this.aggregate([
    {
      $match: {
        publishedAt: { 
          $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
        }
      }
    },
    {
      $addFields: {
        engagementScore: {
          $add: [
            { $multiply: ["$viewCount", 0.7] },
            { $multiply: [{ $size: "$comments" }, 0.3] }
          ]
        }
      }
    },
    { $sort: { engagementScore: -1, publishedAt: -1 } },
    { $limit: limit },
    { $project: { /* your existing projection */ } }
  ]);
};
// Method to find news by category with pagination
NewsSchema.statics.getNewsByCategory = async function(category, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  const query = category === 'All' ? {} : { category };
  
  return this.find(query)
    .sort({ publishedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('title summary category publishedAt imageUrl source isBreaking');
};

const News = mongoose.model('News', NewsSchema);

module.exports = News;