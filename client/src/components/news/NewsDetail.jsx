// components/news/NewsDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { incrementViewCount } from '../../actions/newsAction.js';
import axios from 'axios';
import LoadingSpinner from '../ui/LoadingSpinner';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const NewsDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/news/${id}`);
        setNews(response.data);
        
        // Increment view count
        dispatch(incrementViewCount(id));
      }catch (err) {
        console.error('API Error:', err);
        setError(err.response?.data?.message || 
                err.message || 
                'Failed to fetch news details');
      }finally {
        setLoading(false);
      }
    };
    
    fetchNewsDetail();
  }, [id, dispatch]);
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <LoadingSpinner />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            &larr; Back to news feed
          </Link>
        </div>
      </div>
    );
  }
  
  if (!news) {
    return (
      <div className="container mx-auto max-w-3xl p-4">
        <div className="text-center py-10">
          <p className="text-gray-600 dark:text-gray-400">News article not found</p>
          <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
            &larr; Back to news feed
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto max-w-3xl p-4">
      <Link to="/" className="mb-4 inline-block text-blue-600 hover:underline">
        &larr; Back to news feed
      </Link>
      
      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        {news.isBreaking && (
          <div className="bg-red-600 text-white text-center py-2 font-semibold">
            BREAKING NEWS
          </div>
        )}
        
        {news.imageUrl && (
          <div className="h-64 overflow-hidden">
            <img 
              src={news.imageUrl} 
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded">
              {news.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {formatDate(news.publishedAt)}
            </span>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            {news.title}
          </h1>
          
          <div className="flex items-center text-gray-600 dark:text-gray-400 mb-6">
            <span className="mr-4">By {news.author}</span>
            <span>Source: {news.source}</span>
          </div>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="font-semibold text-lg mb-4">{news.summary}</p>
            <div dangerouslySetInnerHTML={{ __html: news.content }} />
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {news.viewCount} views
            </div>
            
            {news.url && (
              <a 
                href={news.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center"
              >
                Read original article
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;