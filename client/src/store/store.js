import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { adoptReducer } from './reducers/adoptSlice';
import { initWeb3Reducer } from './reducers/initWeb3Slice';

export const store = configureStore({
  reducer: {
    initWeb3Reducer: initWeb3Reducer,
    adoptReducer: adoptReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }),
});
