// components/ui/NotificationContainer.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../actions/uiActions';

const NotificationContainer = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector(state => state.ui);
  
  if (!notification) {
    return null;
  }
  
  const { message, type } = notification;
  
  const getNotificationStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      case 'urgent':
        return 'bg-red-600 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`${getNotificationStyles()} rounded-lg shadow-lg px-4 py-3 transition-all duration-300 transform translate-y-0`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {type === 'urgent' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            <span>{message}</span>
          </div>
          <button 
            className="ml-4 text-white focus:outline-none"
            onClick={() => dispatch(clearNotification())}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationContainer;