// components/layout/Header.js
import React from 'react';

import { Link } from 'react-router-dom';


const Header = () => {



  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
         
          
          <Link to="/" className="text-2xl font-bold text-blue-900 dark:text-blue-400">
            RealTimeNews
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
        
          
         
        </div>
      </div>
    </header>
  );
};

export default Header;