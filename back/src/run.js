import http from 'http';
import app from './app';
import debug from './helpers/debug';
import normalizePort from './helpers/normalizePort';

app.set('port', normalizePort(process.env.PORT || 3000));

const server = http.createServer(app);

server.listen(app.get('port'));

server.on('error', (error) => {
  if (error.syscall !== 'listen') throw error;

  const port = app.get('port');
  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug()(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      debug()(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug()(`Listening on ${bind}`);
});
