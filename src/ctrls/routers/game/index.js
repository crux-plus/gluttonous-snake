// Router middleware for koa.
import Router from 'koa-router';

import config from '../../config';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.render('Game', {
    title: config.title,
  });
});

export default router;
