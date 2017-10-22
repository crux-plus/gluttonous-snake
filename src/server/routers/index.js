// Router middleware for koa.
import Router from 'koa-router';

import game from './game';

const router = new Router();

router.use('/game', game.routes(), game.allowedMethods());

export default router;
