import { routeBuilder } from './utils';

export const MONORAIL = 'monorail';
export const HOVER = 'hover';
export const BUS = 'bus';
export const TUBE = 'tube';

const ITEMS = {
  [MONORAIL]: 'Монорельсы',
  [HOVER]: 'Ховеры',
  [BUS]: 'Автобусы',
  [TUBE]: 'Метро',
};

const getTransport = (slug) => ({
  id: slug,
  name: ITEMS[slug],
  slug,
});

export const builders = Object.keys(ITEMS).reduce(
  (result, transportId) => ({
    ...result,
    [transportId]: routeBuilder(transportId),
  }),
  {},
);

export default Object.keys(ITEMS).map(getTransport);
