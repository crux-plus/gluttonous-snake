// Router middleware for koa.
import Router from 'koa-router';

import addAssetsByChunkName from 'server/middlewares/addAssetsByChunkName';

const router = new Router();

router.use('/', addAssetsByChunkName);

export default router;
