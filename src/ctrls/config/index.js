export default {
  title: 'Koa2 Apps',
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
