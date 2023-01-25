import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cityAPI from '../services/cityAPI';

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
  // Filters
  disabled: false,
  name: null,
};

export const fetchRoutes = createAsyncThunk(
  'route/fetchRoutes',
  async (cityId) => {
    if (!cityId) {
      return [];
    }

    const city = await cityAPI.bySlug(cityId);
    return city ? city.transport : [];
  },
);

export const routeSlice = createSlice({
  name: 'route',
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
    setDisabledFilter: (state, action) => ({
      ...state,
      disabled: action.payload,
    }),
    setNameFilter: (state, action) => ({
      ...state,
      name: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => state)
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        console.log('fulfilled', state, action.payload);
        return {
          ...state,
          items: action.payload,
        };
      });
  },
});

export const { setCity, setDisabledFilter, setNameFilter } = routeSlice.actions;

export const selectRoutes = (state) => state.routes.items.filter((item) => {
  console.log(item);
  return true;
});

export default routeSlice.reducer;
