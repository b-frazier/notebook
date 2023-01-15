const express = require('express');
const path = require('path');
const fs = require('fs')
const uniqid = require('uniqid');
const { dirname } = require('path');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);



app.listen(PORT, () =>
    console.log(`View at http://localhost:${PORT}`)
);