const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');  // Use the db.json data
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Listen to the environment's PORT or default to 3000
server.listen(process.env.PORT || 3000, () => {
  console.log('JSON Server is running');
});
