import LOCATIONS from '../cityAPI/data/locations';

const injectLinks = (location) => {
  if (!location) {
    return location;
  }

  const {
    id,
    cityId,
  } = location;
  return {
    ...location,
    links: {
      main: `/${cityId}/location/${id}`,
    },
  };
};

const fetchLocation = (cityId, locationId) => new Promise((resolve) => {
  setTimeout(async () => {
    let data = LOCATIONS.find((item) => (
      (item.cityId === cityId)
        && (item.id === locationId)
    ));
    data = injectLinks(data);
    resolve({ data });
  }, 500);
});

const setLocation = (locationId, data) => new Promise((resolve) => {
  setTimeout(async () => {
    const location = LOCATIONS.find((item) => (item.id === locationId));
    const id = LOCATIONS.indexOf(location);
    LOCATIONS[id] = {
      ...location,
      ...data,
    };

    const result = await fetchLocation(location.cityId, location.id);

    resolve(result);
  }, 500);
});

const locationAPI = {
  byLocationId: async (cityId, locationId) => {
    console.log(`GET /location/${cityId}/${locationId}`);
    const result = await fetchLocation(cityId, locationId);
    return result.data;
  },
  setLocation: async (locationId, data) => {
    console.log(`PUT /location/${locationId}`);
    const result = await setLocation(locationId, data);
    return result.data;
  },
};

export default locationAPI;
