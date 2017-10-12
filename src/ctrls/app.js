// Fast, unopinionated, minimalist web framework for node.
import Koa from 'koa';

// Authority node http serer package.
import http from 'http';

const app = new Koa();

http.createServer(app.callback()).listen(3000);
