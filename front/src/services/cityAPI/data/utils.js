export const getCity = ({ name, slug }) => ({
  id: slug,
  name,
  slug,
});

const getRoute = (data) => {
  const {
    slug,
  } = data;

  return ({
    ...data,
    id: slug,
  });
};

export const routeBuilder = (transportId) => (data) => getRoute({
  ...data,
  transportId,
});
