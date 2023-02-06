import { getCity } from '../utils';
import LOCATIONS from './locations';

export const cityId = 'nowhere';
export const name = 'Новер';

export const locations = LOCATIONS.map((item) => ({
  cityId,
  ...item,
}));

export default getCity({ name, slug: cityId });
