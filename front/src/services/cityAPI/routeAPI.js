import ROUTES from './data/routes';

const injectLinks = (route) => {
  if (!route) {
    return route;
  }

  const {
    cityId,
    slug,
  } = route;
  return {
    ...route,
    links: {
      main: `/${cityId}/route/${slug}`,
    },
  };
};

const fetchRoutes = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = ROUTES.map(injectLinks);
    resolve({ data });
  }, 500);
});

const fetchByTransportId = (cityId, transportId) => new Promise((resolve) => {
  setTimeout(async () => {
    let data = ROUTES.filter((item) => (
      (item.cityId === cityId)
        && (item.transportId === transportId)
    ));
    data = data.map(injectLinks);
    resolve({ data });
  }, 500);
});

const fetchRoute = (cityId, slug) => new Promise((resolve) => {
  setTimeout(async () => {
    let data = ROUTES.find((item) => (
      (item.cityId === cityId)
        && (item.slug === slug)
    ));
    data = injectLinks(data);
    resolve({ data });
  }, 500);
});

const routeAPI = {
  bySlug: async (cityId, slug) => {
    const result = await fetchRoute(cityId, slug);
    return result.data;
  },
  load: async () => {
    const result = await fetchRoutes();
    return result.data;
  },
  byTransportId: async (cityId, transportId) => {
    const result = await fetchByTransportId(cityId, transportId);
    return result.data;
  },
};

export default routeAPI;
