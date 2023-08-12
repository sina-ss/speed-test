const express = require('express');
const speedTest = require('speed-test');

const app = express();
const PORT = 3001;

app.get('/api/speedtest', (req, res) => {
    speedTest({maxTime: 5000}).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json({error: err.message});
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});