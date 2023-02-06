import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import locationAPI from '../services/locationAPI';

export const GROUP_ALL = 'all';
export const GROUP_CITY = 'city';
export const GROUP_COUNTRY = 'country';

export const STATE_LOCATION_PENDING = 'STATE_LOCATION_PENDING';
export const STATE_LOCATION_READY = 'STATE_LOCATION_READY';

const initialState = {
  locationId: null,
  title: '',
  description: '',
  connections: [],

  state: null,
};

export const fetchLocation = createAsyncThunk(
  'location/fetchLocation',
  async (payload) => {
    const { cityId, locationId } = payload;

    if (!cityId || !locationId) {
      return null;
    }

    const location = await locationAPI.byLocationId(cityId, locationId);
    return location;
  },
);

export const updateLocation = createAsyncThunk(
  'location/updateLocation',
  async (payload) => {
    const { locationId, data } = payload;
    const location = await locationAPI.setLocation(locationId, data);
    return location;
  },
);

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => ({
        ...state,
        state: STATE_LOCATION_PENDING,
      }))
      .addCase(fetchLocation.fulfilled, (state, action) => {
        const location = action.payload;

        if (!location) {
          return state;
        }

        return {
          ...state,
          locationId: location.id,
          title: location.title,
          description: location.description,
          connections: location.connections,
          state: STATE_LOCATION_READY,
        };
      })
      .addCase(updateLocation.pending, (state) => ({
        ...state,
        state: STATE_LOCATION_PENDING,
      }))
      .addCase(updateLocation.fulfilled, (state, action) => {
        const location = action.payload;

        if (!location) {
          return {
            ...state,
            state: STATE_LOCATION_READY,
          };
        }

        return {
          ...state,
          locationId: location.id,
          title: location.title,
          description: location.description,
          connections: location.connections,
          state: STATE_LOCATION_READY,
        };
      });
  },
});

export const selectLocation = (state) => ({
  locationId: state.locations.locationId,
  title: state.locations.title,
  description: state.locations.description,
  connections: state.locations.connections,
});
export const selectIsLoading = (state) => (state.locations.state !== STATE_LOCATION_READY);

export default locationSlice.reducer;
