import routesAPI from './routeAPI';
import TRANSPORT from './data/transport';

const injectRoutes = async (cityId, transport) => {
  if (!transport) {
    return transport;
  }

  const routes = await routesAPI.byTransportId(cityId, transport.id);
  return {
    ...transport,
    routes,
  };
};
const routeLoader = (cityId) => (transport) => injectRoutes(cityId, transport);

const fetchTransport = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = TRANSPORT;
    resolve({ data });
  }, 500);
});

const fetchByCity = (cityId) => new Promise((resolve) => {
  setTimeout(async () => {
    const loaders = TRANSPORT.map(routeLoader(cityId));
    const data = await Promise.all(loaders);
    resolve({ data });
  }, 500);
});

const transportAPI = {
  byCityId: async (cityId) => {
    const result = await fetchByCity(cityId);
    return result.data;
  },
  load: async () => {
    const result = await fetchTransport();
    return result.data;
  },
};

export default transportAPI;
