// actions/categoryActions.js
import {
    SET_ACTIVE_CATEGORY,
    SUBSCRIBE_TO_CATEGORY,
    UNSUBSCRIBE_FROM_CATEGORY
  } from './types';
  import { fetchNewsByCategory } from './newsAction';
  import { socketService } from '../services/socketService';
  
  // Set active category
  export const setActiveCategory = (category) => (dispatch) => {
    dispatch({
      type: SET_ACTIVE_CATEGORY,
      payload: category
    });
    
    // Fetch news for the active category
    dispatch(fetchNewsByCategory(category));
  };
  
  // Subscribe to a category
  export const subscribeToCategory = (category) => (dispatch, getState) => {
    dispatch({
      type: SUBSCRIBE_TO_CATEGORY,
      payload: category
    });
    
    // Get updated subscribed categories
    const { subscribedCategories } = getState().categories;
    
    // Notify socket server about subscription change
    socketService.emit('subscribe', { categories: subscribedCategories });
    
    // Fetch news for the newly subscribed category
    dispatch(fetchNewsByCategory(category));
  };
  
  // Unsubscribe from a category
  export const unsubscribeFromCategory = (category) => (dispatch, getState) => {
    dispatch({
      type: UNSUBSCRIBE_FROM_CATEGORY,
      payload: category
    });
    
    // Get updated subscribed categories
    const { subscribedCategories } = getState().categories;
    
    // Notify socket server about subscription change
    socketService.emit('unsubscribe', { categories: [category] });
  };