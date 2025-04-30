// components/news/TrendingNews.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingNews } from '../../actions/newsAction.js';
import NewsCard from './NewsCard';
import LoadingSpinner from '../ui/LoadingSpinner';

const TrendingNews = () => {
  const dispatch = useDispatch();
  const { trendingNews, loading } = useSelector(state => state.news);
  
  useEffect(() => {
    dispatch(fetchTrendingNews(12));
  }, [dispatch]);
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Trending News
      </h1>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingNews.map(news => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
          
          {trendingNews.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">No trending news articles found</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrendingNews;