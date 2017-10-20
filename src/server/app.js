// Authority node http serer package.
import http from 'http';

// Authority node path package.
import path from 'path';

// Expressive middleware for node.js using ES2017 async functions.
import Koa from 'koa';

// Realtime application framework (Node.JS server).
import socketIO from 'socket.io';

// A Koa view engine which renders React components on server.
import react from 'koa-react-view';

// Development style logger middleware for koa.
import logger from 'koa-logger';

// Compress middleware for koa.
import compress from 'koa-compress';

// koa session store with memory, redis or others.
import session from 'koa-generic-session';

// koa session with redis.
import redisStore from 'koa-redis';

// Terminal utilities for node.js.
import { terminal } from 'terminal-kit';

// compact zlib, deflate, inflate, zip library in JavaScript
import zlib from 'zlib';

// All custome routes.
import routers from './routers';

import config from './config';

const app = new Koa();

react(app, {
  // The root directory of view files.
  views: path.join(__dirname, 'views'),
});

app.use(logger());

app.use(session({
  store: redisStore({
    host: config.redis.host,
    port: config.redis.port,
  }),
}));

app.use(compress({
  threshold: config.compress.threshold,
  flush: zlib.Z_SYNC_FLUSH,
}));

app.use(routers.routes());

const server = http.createServer(app.callback());
const socket = socketIO(server);
server.listen(config.port, () => {
  terminal.blue(`Project is running at http://${config.host}:${config.port}/`);
});
