// components/news/NewsCard.js
import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementViewCount } from '../../actions/newsAction.js';


const NewsCard = memo(({ news }) => {
  const dispatch = useDispatch();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleCardClick = () => {
    dispatch(incrementViewCount(news._id));
  };
  
  return (
    <Link 
      to={`/news/${news._id}`}
      className="block"
      onClick={handleCardClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        {news.isBreaking && (
          <div className="bg-red-600 text-white text-center py-1 font-semibold">
            BREAKING NEWS
          </div>
        )}
        
        {news.imageUrl && (
          <div className="h-48 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-semibold px-2 py-1 rounded">
              {news.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-xs">
              {formatDate(news.publishedAt)}
            </span>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
            {news.title}
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {news.summary}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{news.source}</span>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {news.viewCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default NewsCard;