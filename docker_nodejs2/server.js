'use strict';

const express = require('express');
const cors = require('cors');

// Constants
const PORT = 8083;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors()).
use('/site', express.static('site'))


app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});