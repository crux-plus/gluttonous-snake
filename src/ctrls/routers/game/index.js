// Router middleware for koa.
import Router from 'koa-router';

const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'game';
});

export default router;
