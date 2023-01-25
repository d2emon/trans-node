import { configureStore } from '@reduxjs/toolkit';
import breadcrumbsReducer from './reducers/breadcrumbsSlice';
import counterReducer from './reducers/counterSlice';
import routeReducer from './reducers/routeSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    breadcrumbs: breadcrumbsReducer,
    routes: routeReducer,
    user: userReducer,
  },
});

export default store;
