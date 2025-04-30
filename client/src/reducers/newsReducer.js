// reducers/newsReducer.js
import { 
    FETCH_NEWS_REQUEST, 
    FETCH_NEWS_SUCCESS, 
    FETCH_NEWS_FAILURE,
    ADD_REAL_TIME_NEWS,
    SET_TRENDING_NEWS,
    UPDATE_NEWS_VIEW
  } from '../actions/types';
  
  const initialState = {
    loading: false,
    error: null,
    newsList: {
      All: [],
      Tech: [],
      Business: [],
      Sports: [],
      Entertainment: [],
      Health: [],
      Science: [],
      Politics: []
    },
    trendingNews: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0
    }
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_NEWS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      
      case FETCH_NEWS_SUCCESS:
        return {
          ...state,
          loading: false,
          newsList: {
            ...state.newsList,
            [action.payload.category]: action.payload.news
          },
          pagination: {
            currentPage: action.payload.currentPage,
            totalPages: action.payload.totalPages,
            totalItems: action.payload.totalItems
          }
        };
      
      case FETCH_NEWS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      
      case ADD_REAL_TIME_NEWS:
        const { category, news } = action.payload;
        
        // Add the new article to the beginning of the category list
        return {
          ...state,
          newsList: {
            ...state.newsList,
            [category]: [news, ...state.newsList[category]].slice(0, 50), // Limit to 50 articles
            All: [news, ...state.newsList.All].slice(0, 50) // Add to All category as well
          }
        };
      
      case SET_TRENDING_NEWS:
        return {
          ...state,
          trendingNews: action.payload
        };
      
      case UPDATE_NEWS_VIEW:
        const { id, viewCount } = action.payload;
        
        // Update view count for the article in all categories
        const updatedNewsList = {};
        
        Object.keys(state.newsList).forEach(category => {
          updatedNewsList[category] = state.newsList[category].map(article => 
            article._id === id ? { ...article, viewCount } : article
          );
        });
        
        return {
          ...state,
          newsList: updatedNewsList
        };
      
      default:
        return state;
    }
  };
  
  export default newsReducer;