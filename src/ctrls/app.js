// Expressive middleware for node.js using ES2017 async functions.
import Koa from 'koa';

// Authority node http serer package.
import http from 'http';

const app = new Koa();

http.createServer(app.callback()).listen(3000);
