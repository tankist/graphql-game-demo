const { default: igdb } = require('igdb-api-node');

const client = igdb('557274bd7f7498e145efab5800b1f847');

module.exports.getGames = async ({ search, limit = 10 }) => {
  const { body } = await client.games({ search, limit }, ['id', 'name', 'slug', 'url', 'cover.url', 'summary']);
  return body.map(({
    id: Id, name: Name, slug, url, cover: { url: coverImageUrl = null } = {}, summary: summery = '',
  }) => ({
    Id,
    Name,
    slug,
    summery,
    url,
    coverImageUrl,
  }));
};
