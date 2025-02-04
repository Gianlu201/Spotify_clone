import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../reducers';

const store = configureStore({
  reducer: mainReducer,
});

export default store;

// export types
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
