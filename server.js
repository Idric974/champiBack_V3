const http = require('http');
require('dotenv').config();
const app = require('./app');
const cors = require('cors');
const vert = '\x1b[32m';

app.use(cors());

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3003');
app.set('port', port);

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.on('listening', () => {
  const address = server.address();
  const bind =
    typeof address === 'string' ? 'pipe ' + address : 'port ' + `${port}`;

    console.log('\x1b[32m','[NODE SERVER] Le serveur est démarré sur le http://localhost:'+port);
});

process.on('warning', (e) =>
  console.warn('\x1b[33m', '[WARNING]', e.stack)
);

server.listen(port);
