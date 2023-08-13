const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Sample file for download speed test
const generateRandomData = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}; 

// Download Speed Test Endpoint
app.get('/download', (req, res) => {
    const dataSize = 10 * 1024 * 1024; // 10MB data
    const data = generateRandomData(dataSize);
    res.send(data);
});

const bodyParser = require('body-parser');

app.use(bodyParser.raw({ limit: '10mb', type: 'application/octet-stream' }));

app.post('/upload', (req, res) => {
    // Simply send an acknowledgment. We're just measuring the time taken to upload.
    res.send('Data received');
});

// Ping Test Endpoint
app.get('/ping', (req, res) => {
    res.send({ ping: 'pong' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});