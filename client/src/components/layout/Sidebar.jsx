import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { setActiveCategory, subscribeToCategory, unsubscribeFromCategory } from '../../actions/categoryActions';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { sidebarOpen } = useSelector(state => state.ui);
  const { availableCategories, activeCategory, subscribedCategories } = useSelector(state => state.categories);
  
  const handleCategoryClick = (category) => {
    dispatch(setActiveCategory(category));
  };
  
  const handleSubscribeToggle = (e, category) => {
    e.stopPropagation();
    
    if (subscribedCategories.includes(category)) {
      dispatch(unsubscribeFromCategory(category));
    } else {
      dispatch(subscribeToCategory(category));
    }
  };
  
  return (
    <motion.aside 
      className={`bg-white dark:bg-gray-800 shadow-md h-full flex flex-col ${
        sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
      }`}
      initial={{ width: 0 }}
      animate={{ width: sidebarOpen ? 256 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 flex-1 overflow-y-auto">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Categories</h2>
        
        <ul className="space-y-2">
          {availableCategories.map(category => (
            <motion.li 
              key={category}
              whileTap={{ scale: 0.97 }}
            >
              <div 
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                  activeCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                <span>{category}</span>
                
                {category !== 'All' && (
                  <motion.button 
                    onClick={(e) => handleSubscribeToggle(e, category)}
                    className={`h-5 w-5 rounded-full flex items-center justify-center transition-colors ${
                      subscribedCategories.includes(category)
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {subscribedCategories.includes(category) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
        
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Discover</h2>
          
          <ul className="space-y-2">
            <motion.li whileTap={{ scale: 0.97 }}>
              <Link 
                to="/trending"
                className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Trending
              </Link>
            </motion.li>
          </ul>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;