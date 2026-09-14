import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import supportersReducer from './slices/supportersSlice';
import volunteersReducer from './slices/volunteersSlice';
import targetsReducer from './slices/targetsSlice';
import budgetReducer from './slices/budgetSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    supporters: supportersReducer,
    volunteers: volunteersReducer,
    targets: targetsReducer,
    budget: budgetReducer,
  },
});

export default store;
