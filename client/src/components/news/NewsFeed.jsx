// components/news/NewsFeed.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsByCategory } from '../../actions/newsAction.js';
import NewsCard from './NewsCard';
import Pagination from '../ui/Pagination';
import LoadingSpinner from '../ui/LoadingSpinner';

const NewsFeed = () => {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector(state => state.categories);
  const { newsList, loading, pagination } = useSelector(state => state.news);
  
  useEffect(() => {
    dispatch(fetchNewsByCategory(activeCategory));
  }, [dispatch, activeCategory]);
  
  const handlePageChange = (page) => {
    dispatch(fetchNewsByCategory(activeCategory, page));
  };
  
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        {activeCategory === 'All' ? 'Latest News' : `${activeCategory} News`}
      </h1>
      
      {loading ? (
        <div className="flex justify-center py-10">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList[activeCategory] && newsList[activeCategory].map(news => (
              <NewsCard key={news._id} news={news} />
            ))}
          </div>
          
          {newsList[activeCategory] && newsList[activeCategory].length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-600 dark:text-gray-400">No news articles found</p>
            </div>
          )}
          
          <div className="mt-8">
            <Pagination 
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default NewsFeed;