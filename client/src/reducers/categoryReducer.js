// reducers/categoryReducer.js
import { 
    SET_ACTIVE_CATEGORY, 
    SUBSCRIBE_TO_CATEGORY, 
    UNSUBSCRIBE_FROM_CATEGORY 
  } from '../actions/types';
  
  const initialState = {
    availableCategories: [
      'All', 'technology', 'business', 'sports', 'entertainment', 
      'health', 'science', 'politics'
    ],
    activeCategory: 'All',
    subscribedCategories: ['All']
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_ACTIVE_CATEGORY:
        return {
          ...state,
          activeCategory: action.payload
        };
      
      case SUBSCRIBE_TO_CATEGORY:
        // Don't add duplicates
        if (state.subscribedCategories.includes(action.payload)) {
          return state;
        }
        
        return {
          ...state,
          subscribedCategories: [...state.subscribedCategories, action.payload]
        };
      
      case UNSUBSCRIBE_FROM_CATEGORY:
        // Prevent unsubscribing from "All"
        if (action.payload === 'All') {
          return state;
        }
        
        return {
          ...state,
          subscribedCategories: state.subscribedCategories.filter(
            category => category !== action.payload
          )
        };
      
      default:
        return state;
    }
  };
  
  export default categoryReducer;