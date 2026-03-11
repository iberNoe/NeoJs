/**
 * NeoJS CLI — devServer
 * 
 * A minimal development server for NeoJS projects.
 */

import http from 'http';
import fs from 'fs';
import path from 'path';

export function startDevServer(port = 3000) {
    const server = http.createServer((req, res) => {
        let urlPath = req.url.split('?')[0];
        if (urlPath === '/') urlPath = '/index.html';

        // Try to resolve the file relative to current directory
        let filePath = path.join(process.cwd(), urlPath);

        // If it doesn't exist, try relative to the monorepo root
        if (!fs.existsSync(filePath)) {
            if (urlPath.includes('/packages/')) {
                // Remove leading slash for correct path joining on Windows
                const relativeUrlPath = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;

                // Search up to 3 levels up for the packages directory
                for (let i = 1; i <= 3; i++) {
                    const potentialPath = path.join(process.cwd(), '../'.repeat(i), relativeUrlPath);
                    if (fs.existsSync(potentialPath)) {
                        filePath = potentialPath;
                        break;
                    }
                }
            }
        }

        // ... rest of the logic ...

        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
        };

        const contentType = mimeTypes[extname] || 'application/octet-stream';

        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(500);
                    res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    });

    server.listen(port, () => {
        console.log(`NeoJS Dev Server running at http://localhost:${port}/`);
    });
}
