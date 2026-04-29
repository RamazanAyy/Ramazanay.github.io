// Custom Next.js server — Hostinger LSWS uyumlu
// PORT env değişkeni TCP port veya Unix socket path olabilir
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || '0.0.0.0';
const portValue = process.env.PORT || 3000;
const app = next({ dev, hostname, port: typeof portValue === 'number' ? portValue : Number(portValue) || 3000 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  server.once('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });

  // Hostinger LSWS Unix socket veya TCP port
  // PORT bir sayı ise TCP, değilse string olarak Unix socket path
  const portNum = Number(portValue);
  if (Number.isFinite(portNum) && portNum > 0) {
    server.listen(portNum, hostname, () => {
      console.log(`> Ready on http://${hostname}:${portNum}`);
    });
  } else {
    // Unix socket path
    server.listen(portValue, () => {
      console.log(`> Ready on socket ${portValue}`);
    });
  }
});
