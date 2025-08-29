// server.js
import express from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { fileURLToPath } from 'url';
import cors from 'cors';
// To handle the __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 6003;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));


app.use(cors({
    origin: true,
    credentials: true,
}));



// Proxy requests to /erp to the backend server
app.use(
    '/erp',
    createProxyMiddleware({
        target: 'http://185.105.187.116:3003', // Your backend server URL
        changeOrigin: true,
        pathRewrite: {
            '^/erp': '', // Remove /erp prefix when forwarding to backend
        },
    })
);

// The "catchall" handler: for any request that doesn't match one above, send back the React app.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
