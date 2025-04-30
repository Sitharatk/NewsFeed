import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../reducers/newsReducer';
import categoryReducer from '../reducers/categoryReducer';
import uiReducer from '../reducers/uiReducer';

const store = configureStore({
  reducer: {
    news: newsReducer,
    categories: categoryReducer,
    ui: uiReducer,
  },
  devTools: import.meta.env.MODE !== 'production', // ✅ Vite-compatible env check
});

export default store;
