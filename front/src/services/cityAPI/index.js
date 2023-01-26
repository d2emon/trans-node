import transportAPI from './transportAPI';
import CITIES from './data/city';

const injectLinks = (city) => {
  if (!city) {
    return city;
  }

  const { slug } = city;
  return {
    ...city,
    links: {
      main: `/${slug}/`,
      map: `/${slug}/map`,
      routes: `/${slug}/routes`,
    },
  };
};

const injectTransport = async (city) => {
  if (!city) {
    return city;
  }

  const transport = await transportAPI.byCityId(city.id);
  return {
    ...city,
    transport,
  };
};

const fetchCities = () => new Promise((resolve) => {
  setTimeout(() => {
    const data = CITIES.map(injectLinks);
    resolve({ data });
  }, 500);
});

const fetchCity = (slug) => new Promise((resolve) => {
  setTimeout(async () => {
    let data = CITIES.find((item) => item.slug === slug);
    data = injectLinks(data);
    data = await injectTransport(data);
    resolve({ data });
  }, 500);
});

export default {
  bySlug: async (slug) => {
    console.log(`/api/city/${slug}`);
    const result = await fetchCity(slug);
    return result.data;
  },
  load: async () => {
    console.log('/api/cities');
    const result = await fetchCities();
    return result.data;
  },
};
