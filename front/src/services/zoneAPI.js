const ZONES = [
  { name: 'LIMBO', lastLocationId: 1 },
  { name: 'WSTORE', lastLocationId: 2 },
  { name: 'HOME', lastLocationId: 4 },
  { name: 'START', lastLocationId: 5 },
  { name: 'PIT', lastLocationId: 6 },
  { name: 'WIZROOM', lastLocationId: 19 },
  { name: 'DEAD', lastLocationId: 99 },
  { name: 'BLIZZARD', lastLocationId: 299 },
  { name: 'CAVE', lastLocationId: 399 },
  { name: 'LABRNTH', lastLocationId: 499 },
  { name: 'FOREST', lastLocationId: 599 },
  { name: 'VALLEY', lastLocationId: 699 },
  { name: 'MOOR', lastLocationId: 799 },
  { name: 'ISLAND', lastLocationId: 899 },
  { name: 'SEA', lastLocationId: 999 },
  { name: 'RIVER', lastLocationId: 1049 },
  { name: 'CASTLE', lastLocationId: 1069 },
  { name: 'TOWER', lastLocationId: 1099 },
  { name: 'HUT', lastLocationId: 1101 },
  { name: 'TREEHOUSE', lastLocationId: 1105 },
  { name: 'QUARRY', lastLocationId: 2199 },
  { name: 'LEDGE', lastLocationId: 2299 },
  { name: 'INTREE', lastLocationId: 2499 },
  { name: 'WASTE', lastLocationId: 99999 },
];

const byLocationId = async (locationId) => {
  const itemId = -locationId;
  const defaultResult = {
    zone: { name: 'TCHAN' },
    publicLocationId: 0,
  };

  if (itemId <= 0) {
    return defaultResult;
  }

  let firstLocationId = 0;
  return ZONES.reduce(
    (result, zone) => {
      if (itemId > zone.lastLocationId) {
        return result;
      }

      const {
        lastLocationId,
      } = zone;
      const publicLocationId = itemId - firstLocationId;
      firstLocationId = lastLocationId;
      return {
        zone,
        publicLocationId,
      };
    },
    defaultResult,
  );
};

export default {
  byLocationId,
};
