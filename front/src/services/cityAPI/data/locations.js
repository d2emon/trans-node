import * as nowhere from './nowhere';

const LOCATIONS = [
  ...nowhere.locations,
].map((item, id) => ({
  id: `${id + 1}`,
  ...item,
}));

export default LOCATIONS;
