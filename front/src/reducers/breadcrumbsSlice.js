import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: null,
  items: [],
  user: {
    slug: 'admin',
    name: 'Admin',
    links: {
      profile: '/user/admin',
    },
  },
};

export const breadcrumbsSlice = createSlice({
  name: 'breadcrumbs',
  initialState,
  reducers: {
    setBreadcrumbs: (state, action) => ({
      ...state,
      items: action.payload,
    }),
    setCity: (state, action) => ({
      ...state,
      city: action.payload,
    }),
  },
});

export const { setBreadcrumbs, setCity } = breadcrumbsSlice.actions;

export const selectBreadcrumbs = (state) => state.breadcrumbs.items;
export const selectCity = (state) => state.breadcrumbs.city;
export const selectUser = (state) => state.breadcrumbs.user;

export default breadcrumbsSlice.reducer;
