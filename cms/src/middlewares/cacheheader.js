'use strict';

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    await next();
    if (ctx.request.method === 'GET') {
      if (ctx.request.path.endsWith('.webp') || ctx.request.path.endsWith('.jpg')) {
        ctx.set('Cache-Control', 'public, max-age=31536000');
      } else {
        ctx.set('Cache-Control', 'public, max-age=3600');
      }
    }
  };
};
