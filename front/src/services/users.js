const getUser = async (name, slug) => ({
  name,
  slug,
  links: {
    profile: `/user/${slug}/`,
  },
});

const load = async () => Promise.all([
  getUser('Admin', 'admin'),
]);

const bySlug = async (slug) => {
  const items = await load();
  return items.find((item) => item.slug === slug);
};

const usersAPI = {
  bySlug,
  load,
};

export default usersAPI;
