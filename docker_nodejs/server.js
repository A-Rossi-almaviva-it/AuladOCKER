'use strict';

const express = require('express');

// Constants
const PORT = 8081;
const HOST = '0.0.0.0';

// App
const app = express();

app.use('/site', express.static('site'))

app.get('/hello_world', (req, res) => {
  res.send('Hello World');
});

app.get('/ciao_mondo', (req, res) => {
    res.send('Ciao Mondo');
});

app.get('/message', (req, res) => {
    const text = req.query.text;
    let resp = {message: 'mi hai inviato ' + text}
    res.json(resp);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});