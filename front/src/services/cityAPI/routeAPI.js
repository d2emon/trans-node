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

const fetchRoute = (slug) => new Promise((resolve) => {
  setTimeout(async () => {
    let data = ROUTES.find((item) => item.slug === slug);
    data = injectLinks(data);
    resolve({ data });
  }, 500);
});

export default {
  bySlug: async (slug) => {
    const result = await fetchRoute(slug);
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
