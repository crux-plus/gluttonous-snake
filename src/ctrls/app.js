// Authority node http serer package.
import http from 'http';

// Expressive middleware for node.js using ES2017 async functions.
import Koa from 'koa';

// All custome routes.
import routers from './routers';

const app = new Koa();

app
  .use(routers.routes());

http.createServer(app.callback()).listen(3000);
