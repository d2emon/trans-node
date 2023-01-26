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

export const fetchRoutes = createAsyncThunk(
  'route/fetchRoutes',
  async (cityId) => {
    if (!cityId) {
      return [];
    }

    console.log('Fetching routes');
    const city = await cityAPI.bySlug(cityId);
    return city ? city.transport : [];
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
    console.log(city && city.transport);
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

export const {
  setCity,
  setDisabledFilter,
  setGroupFilter,
  setNameFilter,
} = routeSlice.actions;

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
