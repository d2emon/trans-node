import zoneAPI from './zoneAPI';

const LIGHT_ROOMS = [
  -1100,
  -1101,
];

const LOCATION = {
  brief: null,
  connections: [],
  isDarkRoom: false,
  isDeathRoom: false,
  isNoBrief: false,
  itemId: null,
  locationId: null,
  publicId: null,
  text: [],
  title: '',
};

const LOCATIONS = [
  {
    id: -1,
    connections: [],
    text: [],
    title: '',
  },
];

const injectIsDark = async (location) => {
  const {
    locationId,
  } = location;

  if (LIGHT_ROOMS.includes(locationId)) {
    return {
      ...location,
      isDarkRoom: false,
    };
  }

  if ((locationId <= -1113) && (locationId >= -1123)) {
    return {
      ...location,
      isDarkRoom: true,
    };
  }

  return {
    ...location,
    isDarkRoom: (locationId <= -300) && (locationId >= -399),
  };
};

const parseData = async (locationId, location) => {
  const itemId = -locationId;
  const zone = await zoneAPI.byLocationId(itemId);
  const publicId = itemId - zone.firstLocationId;

  if (!location) {
    return {
      ...LOCATION,
      brief: `You are on channel ${locationId}`,
      itemId,
      locationId,
      publicId,
    };
  }

  const {
    connections,
    text,
    title,
  } = location;

  return text.reduce(
    (locationData, s) => {
      if (s === '#DIE') {
        return {
          ...locationData,
          isDeathRoom: true,
        };
      }

      if (s === '#NOBR') {
        return {
          ...locationData,
          isNoBrief: true,
        };
      }

      return {
        ...locationData,
        text: [
          ...locationData.text,
          s,
        ],
      };
    },
    injectIsDark({
      ...LOCATION,
      connections,
      itemId,
      locationId,
      publicId,
      title,
    }),
  );
};

const findLocation = async (locationId) => {
  const location = LOCATIONS.find((item) => (item.id === locationId));
  return parseData(locationId, location);
};

const load = async (locationId, brief = false) => {
  const location = await findLocation(locationId);

  if (brief && !location.isNoBrief) {
    return {
      ...location,
      text: [],
    };
  }

  return location;
};

export default {
  load,
};
