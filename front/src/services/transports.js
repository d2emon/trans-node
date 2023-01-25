import routesService, {
  bus, hover, monorail, tube,
} from './routes';

const getTransport = async (cityId, name, slug) => ({
  name,
  slug,
  cityId,
});

const load = async () => Promise.all([
  getTransport('nowhere', 'Монорельсы', monorail),
  getTransport('nowhere', 'Ховеры', hover),
  getTransport('nowhere', 'Автобусы', bus),
  getTransport('nowhere', 'Метро', tube),
]);

const byCityId = async (cityId) => {
  const items = await load();
  const transport = items
    .filter((item) => item.cityId === cityId)
    .map((item) => async () => {
      const routes = await routesService.byTransportId(cityId, item.slug);
      return {
        ...item,
        routes,
      };
    });
  return Promise.all(transport.map((loader) => loader()));
};

export default {
  byCityId,
  load,
};
