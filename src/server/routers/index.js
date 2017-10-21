// Router middleware for koa.
import Router from 'koa-router';

import game from './game';

import root from './root';

const router = new Router();

router.use('/', root.routes(), root.allowedMethods());

router.use('/game', game.routes(), game.allowedMethods());

export default router;
