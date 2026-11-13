
const http = require('node:http');

function createServer() {
  return http.createServer((req, res) => {
    if (req.url === '/health' || req.url === '/') {
      res.writeHead(200, {
        'content-type': 'application/json; charset=utf-8'
      });
      res.end(JSON.stringify({ status: 'ok', service: 'backend' }));
      return;
    }

    res.writeHead(404, {
      'content-type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify({ error: 'Not found' }));
  });
}

const port = Number(process.env.PORT || 3000);

if (require.main === module) {
  const server = createServer();

  server.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on ${port}`);
  });
}

module.exports = { createServer };
