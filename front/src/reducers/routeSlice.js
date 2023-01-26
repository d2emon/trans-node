import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cityAPI from '../services/cityAPI';

export const GROUP_ALL = 'all';
export const GROUP_CITY = 'city';
export const GROUP_COUNTRY = 'country';

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
  group: 'all',
};

export const fetchCity = createAsyncThunk(
  'route/fetchCity',
  async (cityId) => {
    if (!cityId) {
      return null;
    }

    console.log('Fetching routes');
    const city = await cityAPI.bySlug(cityId);
    return city;
  },
);

export const fetchRoute = createAsyncThunk(
  'route/fetchRoute',
  async (cityId, routeId) => {
    if (!cityId || !routeId) {
      return null;
    }

    console.log('Fetching route');
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
    setGroupFilter: (state, action) => ({
      ...state,
      group: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => state)
      .addCase(fetchCity.fulfilled, (state, action) => {
        const city = action.payload;
        return {
          ...state,
          items: city ? city.transport : [],
          city,
        };
      });
  },
});

export const {
  setCity,
  setDisabledFilter,
  setGroupFilter,
  setNameFilter,
} = routeSlice.actions;

export const selectCity = (state) => state.routes.city;
export const selectRoutes = (state) => state.routes.items.map((transport) => {
  const routes = transport.routes.filter((item) => {
    const {
      disabled,
      group,
      name,
    } = state.routes;

    let filtered = true;

    if (name) {
      filtered = filtered && item.name.includes(name);
    }

    if (!disabled) {
      filtered = filtered && !item.disabled;
    }

    if (group !== GROUP_ALL) {
      filtered = filtered && (item.group === group);
    }

    return filtered;
  });

  return {
    ...transport,
    routes,
  };
});

export default routeSlice.reducer;
