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

// koa session store with memory, redis or others.
import session from 'koa-generic-session';

// koa session with redis.
import redisStore from 'koa-redis';

// Terminal utilities for node.js.
import { terminal as term } from 'terminal-kit';

// compact zlib, deflate, inflate, zip library in JavaScript
import zlib from 'zlib';

// All custome routes.
import routers from './routers';

import config from './config';

const app = new Koa();

react(app, {
  views: path.join(__dirname, 'views'),
});

app.use(logger());

app.use(bodyParser());

app.use(session({
  store: redisStore({
    host: config.redis.host,
    port: config.redis.port,
  }),
}));

app.use(compress({
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH,
}));

app.use(routers.routes());

term.blue(`Project is running at http://${config.koa2.host}:${config.koa2.port}/`);
http.createServer(app.callback()).listen(config.koa2.port);
