const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = 3000;
server.listen(port, () => {
  console.log(`Mock API is running on port ${port}`);
});
