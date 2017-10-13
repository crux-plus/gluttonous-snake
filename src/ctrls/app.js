// Authority node http serer package.
import http from 'http';

// Authority node path package.
import path from 'path';

// Expressive middleware for node.js using ES2017 async functions.
import Koa from 'koa';

// Development style logger middleware for koa.
import logger from 'koa-logger';

// All custome routes.
import routers from './routers';

const app = new Koa();

app
  .use(logger())
  .use(routers.routes());

http.createServer(app.callback()).listen(3000);
