import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly bind to HOST=0.0.0.0 and process.env.PORT or 3000
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const DIST_DIR = path.join(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.wasm': 'application/wasm'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  console.log(`[${new Date().toISOString()}] ${req.method} ${urlPath}`);

  // Add standard security and CORS headers for production proxy compatibility
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Health Check Endpoints (Crucial for Coolify / Docker / Nginx upstream checks)
  if (urlPath === '/health' || urlPath === '/healthz' || urlPath === '/api/health' || urlPath === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'healthy',
      service: 'agency-os',
      timestamp: new Date().toISOString(),
      port: PORT,
      host: HOST
    }));
    return;
  }

  // Normalize path (handle trailing slashes and default to index.html)
  let relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
  let filePath = path.join(DIST_DIR, relativePath);

  // Prevent directory traversal
  if (!filePath.startsWith(DIST_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  // SPA fallback & static file server
  fs.stat(filePath, (err, stats) => {
    // If directory or file doesn't exist, rewrite to index.html (React SPA Routing)
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        // If dist/index.html is missing, alert cleanly instead of crashing
        res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('500 Internal Server Error: Production build not found. Ensure "npm run build" was executed.');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': ext === '.html' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000, immutable'
      });
      res.end(content);
    });
  });
});

// Explicitly bind to 0.0.0.0
server.listen(PORT, HOST, () => {
  console.log(`=================================================`);
  console.log(`🚀 AgencyOS Production Server Ready!`);
  console.log(`🌐 Listening on: http://${HOST}:${PORT}`);
  console.log(`✅ Healthcheck endpoint: http://${HOST}:${PORT}/healthz`);
  console.log(`=================================================`);
});
