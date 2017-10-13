// Authority node http serer package.
import http from 'http';

// Authority node path package.
import path from 'path';

// Expressive middleware for node.js using ES2017 async functions.
import Koa from 'koa';

// a body parser for koa.
import bodyParser from 'koa-bodyparser';

// A Koa view engine which renders React components on server.
import react from 'koa-react-view';

// Development style logger middleware for koa.
import logger from 'koa-logger';

// Compress middleware for koa.
import compress from 'koa-compress';

// All custome routes.
import routers from './routers';

// compact zlib, deflate, inflate, zip library in JavaScript
import zlib from 'zlib';

const app = new Koa();

react(app, {
  views: path.join(__dirname, 'views'),
});

app
  .use(bodyParser())
  .use(logger())
  .use(routers.routes())
  .use(compress({
    threshold: 2048,
    flush: zlib.Z_SYNC_FLUSH,
  }));

http.createServer(app.callback()).listen(3000);
