// actions/newsActions.js
import {
    FETCH_NEWS_REQUEST,
    FETCH_NEWS_SUCCESS,
    FETCH_NEWS_FAILURE,
    ADD_REAL_TIME_NEWS,
    SET_TRENDING_NEWS,
    UPDATE_NEWS_VIEW
  } from './types';
  import axios from 'axios';
  
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  
  // Fetch news by category
  export const fetchNewsByCategory = (category, page = 1, limit = 10) => async (dispatch) => {
    try {
      dispatch({ type: FETCH_NEWS_REQUEST });
      
      const response = await axios.get(`${API_URL}/news/category/${category}`, {
        params: { page, limit }
      });
      
      dispatch({
        type: FETCH_NEWS_SUCCESS,
        payload: {
          category,
          news: response.data.news,
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems
        }
      });
    } catch (error) {
      dispatch({
        type: FETCH_NEWS_FAILURE,
        payload: error.response?.data?.message || 'Failed to fetch news'
      });
    }
  };
  
  // Fetch trending news
  export const fetchTrendingNews = (limit = 5) => async (dispatch) => {
    try {
      const response = await axios.get(`${API_URL}/news/trending`, {
        params: { limit }
      });
      
      dispatch({
        type: SET_TRENDING_NEWS,
        payload: response.data
      });
    } catch (error) {
      console.error('Error fetching trending news:', error);
    }
  };
  
  // Add real-time news (used with socket.io)
  export const addRealTimeNews = (category, news) => ({
    type: ADD_REAL_TIME_NEWS,
    payload: { category, news }
  });
  
  // Increment view count
  export const incrementViewCount = (id) => async (dispatch) => {
    try {
      const response = await axios.put(`${API_URL}/news/${id}/view`);
      
      dispatch({
        type: UPDATE_NEWS_VIEW,
        payload: {
          id,
          viewCount: response.data.viewCount
        }
      });
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };