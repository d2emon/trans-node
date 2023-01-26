import { cityId } from '.';
import {
  BUS, HOVER, MONORAIL, TUBE, builders,
} from '../transport';

const monorailRoutes = [
  'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
  'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX',
]
  .map((name, routeId) => ({ name, slug: `monorail-${routeId}` }))
  .map(builders[MONORAIL]);

const hoverRoutes = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
]
  .map((name, routeId) => ({ name, slug: `hover-${routeId}` }))
  .map(builders[HOVER]);

const busRoutes = [
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
]
  .map((name, routeId) => ({ name, slug: `bus-${routeId}` }))
  .map(builders[BUS]);

const tubeRoutes = [
  { name: 'Красная', slug: 'tube-red' },
  { name: 'Зеленая', slug: 'tube-green' },
  { name: 'Синяя', slug: 'tube-blue' },
]
  .map(builders[TUBE]);

export default [
  ...monorailRoutes,
  ...hoverRoutes,
  ...busRoutes,
  ...tubeRoutes,
].map((item) => ({
  ...item,
  cityId,
  disabled: (Math.random() * 100) > 25,
  group: (Math.random() * 100) > 25 ? 'city' : 'country',
  title: item.name,
  runs: item.runs || [
    {
      id: '1',
      title: 'Пункт 1 - Пункт 2',
      length: '7 км',
      stops: 14,
    },
    {
      id: '2',
      title: 'Пункт 2 - Пункт 1',
      length: '7 км',
      stops: 14,
    },
  ],
  days: 'Ежедневно',
  schedule: '06:30 - 20:45 каждые 9 мин',
  cost: '7',
  route: 'Маршрут',
  driver: 'Перевозчик',
  info: '',
}));
