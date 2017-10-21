// Router middleware for koa.
import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.render('Game', {
    assetsByChunkName,
  });
});

export default router;
