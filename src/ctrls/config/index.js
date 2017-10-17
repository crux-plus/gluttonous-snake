export default {
  koa2: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
  },
  redis: {
    host: 'localhost',
    port: '6379',
  },
};
