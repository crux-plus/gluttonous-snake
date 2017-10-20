export default {
  title: 'Koa App',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  redis: {
    host: 'localhost',
    port: '6379',
  },
  compress: {
    threshold: 2048,
  },
};
