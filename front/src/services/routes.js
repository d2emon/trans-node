export const monorail = 'monorail';
export const hover = 'hover';
export const bus = 'bus';
export const tube = 'tube';

const getRoute = async (cityId, transportId, name, routeId = null) => {
  const slug = `${transportId}-${routeId || name}`;
  return ({
    name,
    slug,
    cityId,
    transportId,
    links: {
      main: `/${cityId}/route/${slug}`,
    },
  });
};

const load = async () => Promise.all([
  getRoute('nowhere', monorail, 'I', 1),
  getRoute('nowhere', monorail, 'II', 2),
  getRoute('nowhere', monorail, 'III', 3),
  getRoute('nowhere', monorail, 'IV', 4),
  getRoute('nowhere', monorail, 'V', 5),
  getRoute('nowhere', monorail, 'VI', 6),
  getRoute('nowhere', monorail, 'VII', 7),
  getRoute('nowhere', monorail, 'VIII', 8),
  getRoute('nowhere', monorail, 'IX', 9),
  getRoute('nowhere', monorail, 'X', 10),
  getRoute('nowhere', monorail, 'XI', 11),
  getRoute('nowhere', monorail, 'XII', 12),
  getRoute('nowhere', monorail, 'XIII', 13),
  getRoute('nowhere', monorail, 'XIV', 14),
  getRoute('nowhere', monorail, 'XV', 15),
  getRoute('nowhere', monorail, 'XVI', 16),
  getRoute('nowhere', monorail, 'XVII', 17),
  getRoute('nowhere', monorail, 'XVIII', 18),
  getRoute('nowhere', monorail, 'XIX', 19),
  getRoute('nowhere', monorail, 'XX', 20),

  getRoute('nowhere', hover, 'a'),
  getRoute('nowhere', hover, 'b'),
  getRoute('nowhere', hover, 'c'),
  getRoute('nowhere', hover, 'd'),
  getRoute('nowhere', hover, 'e'),
  getRoute('nowhere', hover, 'f'),
  getRoute('nowhere', hover, 'g'),
  getRoute('nowhere', hover, 'h'),
  getRoute('nowhere', hover, 'i'),
  getRoute('nowhere', hover, 'j'),
  getRoute('nowhere', hover, 'k'),
  getRoute('nowhere', hover, 'l'),
  getRoute('nowhere', hover, 'm'),
  getRoute('nowhere', hover, 'n'),
  getRoute('nowhere', hover, 'o'),
  getRoute('nowhere', hover, 'p'),
  getRoute('nowhere', hover, 'q'),
  getRoute('nowhere', hover, 'r'),
  getRoute('nowhere', hover, 's'),
  getRoute('nowhere', hover, 't'),

  getRoute('nowhere', bus, '1'),
  getRoute('nowhere', bus, '2'),
  getRoute('nowhere', bus, '3'),
  getRoute('nowhere', bus, '4'),
  getRoute('nowhere', bus, '5'),
  getRoute('nowhere', bus, '6'),
  getRoute('nowhere', bus, '7'),
  getRoute('nowhere', bus, '8'),
  getRoute('nowhere', bus, '9'),
  getRoute('nowhere', bus, '10'),
  getRoute('nowhere', bus, '11'),
  getRoute('nowhere', bus, '12'),
  getRoute('nowhere', bus, '13'),
  getRoute('nowhere', bus, '14'),
  getRoute('nowhere', bus, '15'),
  getRoute('nowhere', bus, '16'),
  getRoute('nowhere', bus, '17'),
  getRoute('nowhere', bus, '18'),
  getRoute('nowhere', bus, '19'),
  getRoute('nowhere', bus, '20'),

  getRoute('nowhere', tube, 'Красная', 'red'),
  getRoute('nowhere', tube, 'Зеленая', 'green'),
  getRoute('nowhere', tube, 'Синяя', 'blue'),
]);

const byTransportId = async (cityId, transportId) => {
  const items = await load();
  return items.filter((item) => (
    (item.cityId === cityId)
            && (item.transportId === transportId)
  ));
};

/*
const byRouteId = async (slug) => {
    const items = await load();
    return items.find(item => item.slug === slug);
}
*/

export default {
  // bySlug,
  byTransportId,
  load,
};
