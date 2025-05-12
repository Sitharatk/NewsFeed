import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setActiveCategory, subscribeToCategory, unsubscribeFromCategory } from '../../actions/categoryActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { activeCategory, availableCategories, subscribedCategories } = useSelector(state => state.categories);
  
  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
  };
  
  const handleSubscribeToggle = (e, category) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (subscribedCategories.includes(category)) {
      dispatch(unsubscribeFromCategory(category));
    } else {
      dispatch(subscribeToCategory(category));
    }
  };
  
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm overflow-x-auto">
      <div className="flex items-center px-4 space-x-4 py-2">
        {/* Categories */}
        <div className="flex space-x-2 items-center">
          {availableCategories.map(category => (
            <NavLink
              key={category}
              to={`/category/${category.toLowerCase()}`}
              className={({ isActive }) => 
                `relative px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`
              }
              onClick={() => handleCategoryClick(category)}
            >
              {({ isActive }) => (
                <motion.div 
                  className="flex items-center space-x-1"
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{category}</span>
                  {category !== 'All' && subscribedCategories.includes(category) && (
                    <motion.button
                      onClick={(e) => handleSubscribeToggle(e, category)}
                      className="h-4 w-4 rounded-full bg-green-500 text-white flex items-center justify-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Unsubscribe"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Divider */}
        <div className="border-l border-gray-200 dark:border-gray-700 h-6" />

        {/* Discover section */}
        <NavLink
          to="/trending"
          className={({ isActive }) => 
            `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`
          }
        >
          <motion.div className="flex items-center" whileTap={{ scale: 0.95 }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>Trending</span>
          </motion.div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Sidebar;