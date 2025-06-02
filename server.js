const app = require('./src/app');
const port = process.env.PORT || 3000;

const initSocket = require('./src/socket/index');
const server = initSocket(app);

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});