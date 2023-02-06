import { configureStore } from '@reduxjs/toolkit';
import breadcrumbsReducer from './reducers/breadcrumbsSlice';
import counterReducer from './reducers/counterSlice';
import locationsReducer from './reducers/locationSlice';
import routeReducer from './reducers/routeSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    breadcrumbs: breadcrumbsReducer,
    locations: locationsReducer,
    routes: routeReducer,
    user: userReducer,
  },
});

export default store;
