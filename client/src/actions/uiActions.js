// actions/uiActions.js
import {
    TOGGLE_SIDEBAR,
    SET_THEME,
    TOGGLE_NOTIFICATIONS,
    SET_LOADING,
    SHOW_NOTIFICATION,
    CLEAR_NOTIFICATION
  } from './types';
  
  // Toggle sidebar
  export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR
  });
  
  // Set theme
  export const setTheme = (theme) => ({
    type: SET_THEME,
    payload: theme
  });
  
  // Toggle notifications
  export const toggleNotifications = () => ({
    type: TOGGLE_NOTIFICATIONS
  });
  
  // Set loading state
  export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading
  });
  
  // Show notification
  export const showNotification = (message, type = 'info') => (dispatch) => {
    dispatch({
      type: SHOW_NOTIFICATION,
      payload: {
        message,
        type
      }
    });
    
    // Auto-clear notification after 5 seconds
    setTimeout(() => {
      dispatch({ type: CLEAR_NOTIFICATION });
    }, 5000);
  };
  
  // Clear notification
  export const clearNotification = () => ({
    type: CLEAR_NOTIFICATION
  });