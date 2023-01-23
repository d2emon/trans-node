import transportService from "./transports";

const getCity = async (name, slug) => ({
    name,
    slug,
    links: {
        main: `/${slug}/`,
        map: `/${slug}/map`,
        routes: `/${slug}/routes`,    
    },
});

const load = async () => Promise.all([
    getCity('Новер', 'nowhere'),
]);

const bySlug = async (slug) => {
    const items = await load();
    const city = items.find(item => item.slug === slug);

    const transport = await transportService.byCityId(slug);
    return {
        ...city,
        transport,
    };
}

export default {
    bySlug,
    load,
};
