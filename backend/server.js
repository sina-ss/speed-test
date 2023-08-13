const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.raw({ type: '*/*', limit: '10mb' }));  // to handle raw data for upload

// Generate random data for the download test
function generateRandomData(size) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Download endpoint
app.get('/download', (req, res) => {
    const dataSize = 1024 * 1024 * 10; // 10MB
    const data = generateRandomData(dataSize);
    res.setHeader('Content-Length', dataSize); // important to set content length for speed tests
    res.send(data);
});

// Upload endpoint
app.post('/upload', (req, res) => {
    // Just acknowledge the received data
    res.send('Data received');
});

// Ping test endpoint
app.get('/ping', (req, res) => {
    res.send({ ping: 'pong' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});