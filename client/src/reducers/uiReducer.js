// reducers/uiReducer.js
import { 
    TOGGLE_SIDEBAR,
    SET_THEME,
    TOGGLE_NOTIFICATIONS,
    SET_LOADING,
    SHOW_NOTIFICATION,
    CLEAR_NOTIFICATION
  } from '../actions/types';
  
  const initialState = {
    sidebarOpen: true,
    theme: 'light',
    notificationsEnabled: true,
    loading: false,
    notification: null
  };
  
  const uiReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_SIDEBAR:
        return {
          ...state,
          sidebarOpen: !state.sidebarOpen
        };
      
      case SET_THEME:
        return {
          ...state,
          theme: action.payload
        };
      
      case TOGGLE_NOTIFICATIONS:
        return {
          ...state,
          notificationsEnabled: !state.notificationsEnabled
        };
      
      case SET_LOADING:
        return {
          ...state,
          loading: action.payload
        };
      
      case SHOW_NOTIFICATION:
        return {
          ...state,
          notification: action.payload
        };
      
      case CLEAR_NOTIFICATION:
        return {
          ...state,
          notification: null
        };
      
      default:
        return state;
    }
  };
  
  export default uiReducer;