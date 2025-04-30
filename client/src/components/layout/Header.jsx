// components/layout/Header.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {  setTheme, toggleNotifications } from '../../actions/uiActions';

const Header = () => {
  const dispatch = useDispatch();
  const { theme, notificationsEnabled } = useSelector(state => state.ui);
  
  
const handleToggleTheme = () => {
  const newTheme = theme === 'light' ? 'dark' : 'light';
  dispatch(setTheme(newTheme));
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', newTheme); // Persist it
};

  const handleToggleNotifications = () => {
    dispatch(toggleNotifications());
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
         
          
          <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            RealTimeNews
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleToggleNotifications}
            className={`text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 ${
              notificationsEnabled ? 'text-blue-500 dark:text-blue-400' : ''
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <button 
            onClick={handleToggleTheme}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;